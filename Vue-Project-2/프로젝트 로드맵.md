좋아, 하루 만에 데모 찍을 수 있게 가장 짧은 경로로 쪼개줄게. 그대로 따라 하면 “피부타입/고민 선택 → 성분 매핑 → 추천 제품 카드 + 유튜브 세안법 영상”까지 돌아간다. 스택은 네가 말한 그대로: IntelliJ + UbiAccess(Java) + MySQL(HeidiSQL) + Vue.js(SPA). 외부 데이터는 Open Beauty Facts API(옵션) + 로컬 시드 데이터 혼합으로 간다.

0) 프로젝트 뼈대(30분)

백엔드 (IntelliJ)
- Maven 프로젝트 생성 (group: com.demo.skin, artifact: skinguide)
- 의존성(예시): javax.servlet, gson, mysql-connector-j, okhttp(외부 API 호출용), CORS 필터
- 패키지: controller, service, repo, model, config

프론트엔드 (Vite 기반 Vue)
```bash
npm create vue@latest skincare-demo
cd skincare-demo
npm i axios pinia vue-router
npm i -D eslint prettier
```

DB

MySQL 스키마 생성: skinguide

HeidiSQL로 접속해 아래 스키마 실행

```sql
-- schema.sql
CREATE TABLE profile (
  id VARCHAR(36) PRIMARY KEY,
  skin_type VARCHAR(32) NOT NULL,      -- oily|dry|combo|sensitive|acne|dehydrated_oily
  concerns JSON NOT NULL,              -- ["sebum","pores","acne","pigment","sensitivity","dryness"]
  season VARCHAR(16) NOT NULL,         -- spring|summer|autumn|winter
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ingredient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  inci VARCHAR(128) NOT NULL,
  tags JSON NOT NULL                   -- ["sebum","acne","brightening","barrier","soothing","hydration"]
);

CREATE TABLE product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  brand VARCHAR(120),
  step VARCHAR(40),                    -- cleanser|toner|serum|cream|sunscreen
  ingredients_text TEXT,               -- 원문 성분 문자열 (검색용)
  image_url VARCHAR(255),
  buy_url VARCHAR(255)                 -- 올영/쿠팡 등 링크
);

CREATE TABLE product_ingredient (
  product_id INT,
  ingredient_id INT,
  PRIMARY KEY(product_id, ingredient_id),
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);
```

**시드 데이터(핵심 성분 & 데모용 제품 10~20개)**만 먼저 넣어라. (나이아신아마이드, 살리실산, 아제라인, 센텔라, 판테놀, 히알루론산, 세라마이드, 아연PCA 등)

1) 추천 로직(핵심 아이디어 10분)

- **concern → key-ingredients 매핑 테이블**(하드코딩 또는 ingredient.tags)

```
sebum/pores/acne → ["salicylic acid","niacinamide","zinc PCA","azelaic acid"]

dryness/barrier → ["ceramide","hyaluronic acid","panthenol","shea butter"]

sensitivity → ["centella asiatica","madecassoside","panthenol","allantoin"]

brightening/pigment → ["niacinamide","vitamin c","arbutin","azelaic acid"]
```

- **랭킹 규칙(간단)**
  - 제품 성분 문자열에 매칭된 핵심 성분 개수(desc)
  - 계절 가중치(여름 → 보송/오일프리 step, 겨울 → 크림/보습 step 가점)
  - step 우선순위(클렌저→토너→세럼→크림→선크림 전 단계에서 골고루 노출)

2) 백엔드 라우트(60분)

### 공통: CORS 허용 필터
```java
// config/CorsFilter.java
public class CorsFilter implements Filter {
  public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
      throws IOException, ServletException {
    HttpServletResponse response = (HttpServletResponse) res;
    HttpServletRequest request = (HttpServletRequest) req;
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    if ("OPTIONS".equalsIgnoreCase(request.getMethod())) return;
    chain.doFilter(req, res);
  }
}
```

### 모델(요약)
```java
// model/Profile.java
public class Profile {
  public String id;
  public String skin_type;
  public List<String> concerns;
  public String season;
}
```

### 프로필 저장 & 세션 키 발급
```java
// controller/ProfileController.java
@WebServlet("/api/profile")
public class ProfileController extends HttpServlet {
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    Profile p = new Gson().fromJson(req.getReader(), Profile.class);
    p.id = UUID.randomUUID().toString();
    // JDBC insert into profile ...
    resp.setContentType("application/json");
    resp.getWriter().write("{"profileId":""+p.id+""}");
  }
}
```

### 추천 조회 (핵심)
```java
// controller/RecommendController.java
@WebServlet("/api/recommend")
public class RecommendController extends HttpServlet {
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    String profileId = req.getParameter("profileId");
    // 1) profile 조회 (skin_type, concerns, season)
    // 2) concerns -> keyIngredients 리스트 생성
    // 3) product 테이블에서 ingredients_text LIKE 매칭 + 점수계산
    //    SELECT *, 
    //      ( (ingredients_text LIKE '%niacinamide%') +
    //        (ingredients_text LIKE '%salicylic%') + ... ) AS score
    //    FROM product
    //    WHERE step IN ('cleanser','toner','serum','cream','sunscreen')
    //    ORDER BY score DESC
    // 4) step별 상위 N개씩 그룹핑하여 JSON 반환
    resp.setContentType("application/json");
    resp.getWriter().write(/* Gson으로 직렬화 */);
  }
}
```

(옵션) Open Beauty Facts API 라우팅

외부 호출은 서버에서 프록시 형태로:

```java
// service/OBFClient.java (간단 예시)
public class OBFClient {
  OkHttpClient http = new OkHttpClient();
  public String searchByIngredient(String q) throws IOException {
    HttpUrl url = HttpUrl.parse("https://world.openbeautyfacts.org/cgi/search.pl")
      .newBuilder()
      .addQueryParameter("search_terms", q)
      .addQueryParameter("search_simple", "1")
      .addQueryParameter("json", "1")
      .build();
    Request req = new Request.Builder().url(url).build();
    return http.newCall(req).execute().body().string();
  }
}
```

3) 프론트(Vue) 골격(60분)

### 라우터 & 스토어
```ts
// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
createApp(App).use(createPinia()).use(router).mount('#app');

// src/store/useProfile.ts
import { defineStore } from 'pinia';
export const useProfile = defineStore('profile', {
  state: () => ({ id: '', skinType: '', concerns: [] as string[], season: 'summer' }),
  actions: {
    load() { const s = sessionStorage.getItem('profile'); if (s) Object.assign(this, JSON.parse(s)); },
    save() { sessionStorage.setItem('profile', JSON.stringify(this.$state)); }
  }
});
```

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import Onboarding from '../views/Onboarding.vue';
import Dashboard from '../views/Dashboard.vue';
import Recommend from '../views/Recommend.vue';
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Onboarding },
    { path: '/dashboard', component: Dashboard },
    { path: '/recommend', component: Recommend }
  ]
});
```

### 온보딩(피부타입/고민/계절)
```vue
<!-- src/views/Onboarding.vue -->
<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1>내 피부 설정</h1>
    <section>
      <h3>피부타입</h3>
      <div>
        <button v-for="t in types" :key="t" @click="skinType=t">{{t}}</button>
      </div>
    </section>
    <section>
      <h3>고민</h3>
      <div>
        <label v-for="c in allConcerns" :key="c">
          <input type="checkbox" :value="c" v-model="concerns"/> {{c}}
        </label>
      </div>
    </section>
    <section>
      <h3>계절</h3>
      <select v-model="season"><option>spring</option><option>summer</option><option>autumn</option><option>winter</option></select>
    </section>
    <button @click="next">저장하고 시작</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useProfile } from '../store/useProfile';
const store = useProfile(); const router = useRouter();
const types = ['dehydrated_oily','oily','dry','combo','sensitive','acne'];
const allConcerns = ['sebum','pores','acne','dryness','barrier','sensitivity','brightening'];
let skinType = $ref('dehydrated_oily'); let concerns = $ref<string[]>(['sebum']); let season = $ref('summer');

async function next(){
  const { data } = await axios.post('/api/profile', { skin_type: skinType, concerns, season });
  store.id = data.profileId; store.skinType = skinType; store.concerns = concerns; store.season = season; store.save();
  router.push('/dashboard');
}
</script>
```

### 대시보드(카드 → 라우팅 + 영상)
```vue
<!-- src/views/Dashboard.vue -->
<template>
  <div class="p-6">
    <h2>맞춤 카드</h2>
    <div class="grid">
      <div class="card" @click="$router.push('/recommend')">추천 제품</div>
      <div class="card" @click="openVideo">세안법 영상</div>
      <div class="card">계절 가이드: {{store.season}}</div>
    </div>
    <div v-if="videoId" class="mt-4">
      <iframe width="560" height="315" :src="`https://www.youtube.com/embed/${videoId}`" frameborder="0" allowfullscreen/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProfile } from '../store/useProfile';
const store = useProfile(); store.load();
const map: Record<string,string> = {
  sebum: 'bZ2a0m...', acne: 'G3...x', dryness: 'QW...9' // 데모용 영상 ID 매핑
};
let videoId = $ref('');
function openVideo(){ const key = store.concerns[0] || 'sebum'; videoId = map[key] || 'bZ2a0m...'; }
</script>
```

### 추천 리스트
```vue
<!-- src/views/Recommend.vue -->
<template>
  <div class="p-6">
    <h2>맞춤 추천</h2>
    <div v-for="(items, step) in grouped" :key="step">
      <h3>{{step}}</h3>
      <div class="grid">
        <article v-for="p in items" :key="p.id" class="card">
          <img :src="p.image_url" alt="" />
          <h4>{{p.brand}} {{p.name}}</h4>
          <small>{{p.step}}</small>
          <a :href="p.buy_url" target="_blank">최저가/구매</a>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'; import { useProfile } from '../store/useProfile';
const store = useProfile(); store.load();
let grouped = $ref<Record<string, any[]>>({});
(async ()=>{
  const { data } = await axios.get('/api/recommend', { params: { profileId: store.id } });
  grouped = data.grouped;          // { cleanser:[...], toner:[...], ... }
})();
</script>
```

4) 데이터 시드(40분)

**ingredient** (예)
```sql
INSERT INTO ingredient (inci, tags) VALUES
('Niacinamide', '["sebum","pores","brightening"]'),
('Salicylic Acid', '["acne","sebum","pores"]'),
('Zinc PCA', '["sebum","acne"]'),
('Azelaic Acid', '["acne","brightening"]'),
('Centella Asiatica Extract', '["soothing","sensitivity"]'),
('Panthenol', '["barrier","soothing","hydration"]'),
('Hyaluronic Acid', '["hydration"]'),
('Ceramide NP', '["barrier","dryness"]');
```

product (데모용 1020개: 클렌저/토너/세럼/크림/선크린 각 23개씩)
ingredients_text에는 위 키워드가 실제로 들어가게 작성. `buy_url`은 올영/쿠팡 아무 상품 링크로 채워도 데모 OK.

5) 추천 로직 쿼리(20분)
```sql
-- 예: concerns에 따른 키워드가 "niacinamide","salicylic"일 때
SELECT p.*,
  ((ingredients_text LIKE '%niacinamide%') +
   (ingredients_text LIKE '%salicylic%') +
   (ingredients_text LIKE '%zinc pca%')) AS score
FROM product p
WHERE p.step IN ('cleanser','toner','serum','cream','sunscreen')
ORDER BY score DESC
LIMIT 50;
```

Java에서 concerns→키워드 리스트 생성 후 동적 SQL 빌드. step별로 상위 3개씩 뽑아 `grouped` 형태로 리턴.

6) 새로고침 유지(5분)

- Pinia 상태를 **sessionStorage**에 저장(이미 store에 `save/load` 구현)
- 추후엔 `pinia-plugin-persistedstate`로 교체 가능.

7) 외부 API(옵션 30분)

- Open Beauty Facts 검색 응답을 받아 `name/brand/ingredients_text/image/buy_url` 일부를 추출해 `product`에 upsert 후 동일 로직 재사용.
- CORS는 백엔드에서 프록시 호출로 해결(위 `OBFClient` 참고).

8) 스타일 최소화(20분)

- 카드형 레이아웃만 간단 CSS: `.grid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(220px,1fr))} .card{border:1px solid #eee;border-radius:12px;padding:12px}`
- 모바일 대응: `@media (max-width: 640px){ iframe{width:100%;height:220px} }`

9) 로컬 실행(10분)

- **백엔드**: 톰캣/내장서버에서 `/api/*` 서블릿 매핑, `http://localhost:8080`
- **프론트**: `npm run dev` (Vite 기본 5173)
- 프록시 설정(개발 편의):
```js
// vite.config.js
export default {
  server:{ proxy:{ '/api':'http://localhost:8080' } }
}
```

10) 데모 흐름

1) 온보딩에서 `수분부족지성 + sebum/pores + summer` 선택 → 저장
2) 대시보드 카드 눌러 추천 → step별로 2~3개씩 카드 노출
3) 세안법 카드 → concern별 YouTube 영상 임베드
4) “최저가/구매” 링크 작동 확인

체크리스트(필수)

- [ ] schema.sql 적용 & 시드 insert
- [ ] /api/profile POST 정상 동작
- [ ] /api/recommend GET이 step별 그룹 JSON 반환
- [ ] 온보딩→대시보드→추천 라우팅
- [ ] 세션 유지(새로고침 후에도 프로필 남음)
- [ ] 카드 클릭 시 구매 링크 새 탭 열림
