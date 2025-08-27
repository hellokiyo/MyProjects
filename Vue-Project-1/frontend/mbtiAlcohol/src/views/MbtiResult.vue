<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="card">
      <div class="card-header pt-9 pb-7 d-flex justify-content-center">
        <h1 class="cDDfont fs-3tx">{{ mbti }}</h1>
      </div>


      <div class="card-body pt-9 pb-9 ">
        <div class="d-flex flex-wrap flex-sm-nowrap mb-6">
          <!--begin::mbti 술 이미지-->
          <div class="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4 ">
            <img class="mw-150px mw-lg-150px img-fluid rounded-3 mt-2 mb-2" :src="`http://localhost:7001${result.image}`" alt="image"/>
          </div>
          <!--end::mbti 술 이미지-->

          <!--begin::Wrapper-->
          <div class="flex-grow-1">
            <!--begin::Head-->
            <div class="d-flex justify-content-between align-items-start flex-wrap mb-2">
              <!--begin::Details-->
              <div class="d-flex flex-column">
                <div class="d-flex align-items-center mb-1">
                  <a href="#" class="text-gray-800 text-hover-primary fs-2 fw-bold me-3">{{result.name}}</a>
                  <span class="badge bg-light-danger me-auto">{{result.abv}}º</span>
                </div>
                <div class="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-500">

                  {{result.reason}}
                </div>
              </div>
              <!--end::Details-->

            </div>
            <!--end::Head-->
          </div>
          <!--end::Wrapper-->
        </div>

        <!-- 탭 메뉴 -->
        <ul class="nav nav-pills nav-pills-custom mb-3">

          <!--플레이리스트 메뉴-->
          <li class="nav-item mb-3 me-3 me-lg-4">
            <a class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-95px h-90px pt-5 pb-2"
               data-bs-toggle="pill"
               href="#widget_tab_2">
              <div class="nav-icon mb-3">
                <i class="ki-duotone ki-car fs-1"></i>
              </div>
              <span class="nav-text text-gray-800 fw-bold fs-4 lh-1">플레이<br>리스트</span>
              <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"></span>
            </a>
          </li>

          <!--어울리는 순간 메뉴-->
          <li class="nav-item mb-3 me-3 me-lg-4">
            <a class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-95px h-90px pt-5 pb-2"
               data-bs-toggle="pill"
               href="#widget_tab_3">
              <div class="nav-icon mb-3">
                <i class="ki-duotone ki-car fs-1"></i>
              </div>
              <span class="nav-text text-gray-800 fw-bold fs-4 lh-1">어울리는<br>순간</span>
              <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"></span>
            </a>
          </li>

          <!--어울리는 음식 메뉴-->
          <li class="nav-item mb-3 me-3 me-lg-4">
            <a class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-95px h-90px pt-5 pb-2"
               data-bs-toggle="pill"
               href="#widget_tab_4">
              <div class="nav-icon mb-3">
                <i class="ki-duotone ki-car fs-1"></i>
              </div>
              <span class="nav-text text-gray-800 fw-bold fs-4 lh-1">어울리는<br>음식</span>
              <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"></span>
            </a>
          </li>

          <!--잔에 담긴 이야기 메뉴-->
          <li class="nav-item mb-3 me-3 me-lg-4">
            <a class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-95px h-90px pt-5 pb-2"
               data-bs-toggle="pill"
               href="#widget_tab_5">
              <div class="nav-icon mb-3">
                <i class="ki-duotone ki-car fs-1"></i>
              </div>
              <span class="nav-text text-gray-800 fw-bold fs-4 lh-1">잔에 담긴<br>이야기</span>
              <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"></span>
            </a>
          </li>

          <!--생산지 메뉴-->
          <li class="nav-item mb-3 me-3 me-lg-4">
            <a class="nav-link btn btn-outline btn-flex btn-color-muted btn-active-color-primary flex-column overflow-hidden w-95px h-90px pt-5 pb-2 active"
               data-bs-toggle="pill"
               href="#widget_tab_1">
              <div class="nav-icon mb-3">
                <i class="ki-duotone ki-car fs-1"></i>
              </div>
              <span class="nav-text text-gray-800 fw-bold fs-4 lh-1">생산지</span>
              <span class="bullet-custom position-absolute bottom-0 w-100 h-4px bg-primary"></span>
            </a>
          </li>
          <!-- Social, Mobile, Others도 동일하게 -->
        </ul>


        <!-- 텝 콘텐츠 -->
        <div class="tab-content">
          <!-- 지도 콘텐츠 -->
          <div class="tab-pane fade show active" id="widget_tab_1">
            <div class="row g-5 g-xxl-8">
              <div class="col">
                <div class="card rounded">
                  <div class="card-body">
                    <p class="text-gray-600 fw-bold fs-4">{{ result.brewery_city }}</p>
                    <div id="mapContainer" style="width:100%; height:400px;"  class="mb-4 w-full h-48 object-cover rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 음악 콘텐츠 -->
          <div class="tab-pane fade" id="widget_tab_2">
            <div class="row g-5 g-xxl-8">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <p class="text-gray-600 fw-bold fs-4">{{ result.music }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 분위기 콘텐츠 -->
          <div class="tab-pane fade" id="widget_tab_3">
            <div class="row g-5 g-xxl-8">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <p class="text-gray-600 fw-bold fs-4">{{ result.mood }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 음식 콘텐츠 -->
          <div class="tab-pane fade" id="widget_tab_4">
            <div class="row g-5 g-xxl-8">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <p class="text-gray-600 fw-bold fs-4">{{ result.food }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 이야기 콘텐츠 -->
          <div class="tab-pane fade" id="widget_tab_5">
            <div class="row g-5 g-xxl-8">
              <div class="col">
                <div class="card">
                  <div class="card-body">
                    <p class="text-gray-600 fw-bold fs-4">{{ result.story }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social / Mobile / Others도 동일 -->
        </div>
      </div>
    </div>
  </div>
    <!-- Project Targets -->
    <div class="d-flex flex-wrap flex-stack pt-10 pb-8">

    </div>

    <!-- ================= 아래: 테스트 버튼 + 축제 목록 ================= -->
    <div class="tab-content">
      <!-- 다시하기 버튼 -->
      <div class="d-flex justify-content-center my-5">
        <button class="btn btn-primary" @click="testPage()">테스트 다시하기</button>
      </div>

      <!-- 축제 일정 제목 -->
      <h3 class="ms-5 fw-bold my-2">
        2025 다가올 주류 축제 일정
        <span class="fs-6 text-gray-500 fw-semibold ms-1">업데이트 목록 ↓</span>
      </h3>

      <!-- v-for로 JSON 데이터 출력 -->
      <div class="row g-9">
        <div
            v-for="(festival, index) in festivals"
            :key="index"
            class="col-md-4 col-lg-12 col-xl-4"
        >
          <div class="card card-flush mb-6">
            <div class="card-body">
              <a href="#" class="fs-5 fw-bold mb-2 text-gray-900 text-hover-primary">
                {{ festival.title }}
              </a>
              <div class="fs-6 text-gray-600 mb-5">
                <li>일정</li> {{ festival.date }}
                <li>장소</li>
                <span v-html="festival.location"></span>
                <li v-if="festival.description">내용</li>
                {{ festival.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup>
/* ------------------------------
   Vue 3 Composition API
-------------------------------- */
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// 주류 축제 목록 JSON
import festivals from "../data/festivals.json";

// 쿼리 파라미터로 전달받은 MBTI 값
const route = useRoute();
const mbti = route.query.mbti;

// 추천 결과 저장 (API 응답)
const result = ref({});
const loading = ref(true);
const error = ref("");

/* onMounted: 화면 로드 시 실행 */
onMounted(async () => {
  const kakao = window.kakao;
  const mapContainer = document.getElementById("mapContainer");

  try {
    // MBTI 기반 추천 데이터 요청
    const { data } = await axios.get(
        `http://localhost:7001/mbti/recommend?mbti=${mbti}`
    );

    // 응답 데이터 저장
    result.value = data;

    // Kakao 지도 표시
    const lat = Number(data.city_lat);
    const lng = Number(data.city_lng);
    const map = new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(lat, lng),
      level: 12,
    });

    new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(lat, lng),
      title: data.name,
    });
  } catch (e) {
    error.value = "결과를 불러오지 못했습니다.";
  } finally {
    loading.value = false;
  }
});

/* 테스트 다시하기 버튼: 홈으로 이동 */
function testPage() {
  window.location.href = "/";
}
</script>


<style>
@font-face {
  font-family: 'Cafe24Dongdong';
  src: url('/assets/fonts/Cafe24Dongdong-v2.0.woff2') format('woff2'),
  url('/assets/fonts/Cafe24Dongdong-v2.0.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.cDDfont {
  font-family: 'Cafe24Dongdong', sans-serif;
}

</style>
