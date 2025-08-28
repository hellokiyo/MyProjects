<template>
  <div class="card row content-bg bg-cover bg-center" style="background-image: url('src/assets/svg/pado.svg')">

    <div class="card-body d-flex flex-column justify-content-end align-items-center p-3">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <label class="fs-sm-3hx">계절별 루틴</label>
      </div>
    </div>



    <!-- =========== 주 내용 시작 ===========-->
    <div class="card-body row">
      <div class="card bgi-position-center bgi-size-cover w-100 m-3" style="
        background-image: url('src/assets/images/skin/skin3.png');
        height:280px;">
      </div>

      <!--특징-->
      <div class="d-flex flex-column rounded p-5 mb-4">
        <div class="border-bottom-dashed">
          <label class="fw-bold fs-4">특징</label>
        </div>

        <div>
          <p></p>
        </div>
      </div>


    </div>


    <div class="card-footer">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <button class="btn btn-primary pt-3" @click="goToProblem">뒤로가기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue의 Composition API 함수들을 불러옵니다.
import {onMounted, ref} from 'vue'

// Pinia 스토어를 가져오기 위한 import
import { storeToRefs } from "pinia";

// 스토어 파일들을 불러옵니다. `@`는 `src` 디렉토리를 의미하는 별칭입니다.
import { useAppStore } from "@/stores/app";
import router from "@/router/index.js";
import axios from 'axios';
import {requestConfig} from "../../app.config.js";
import { useSkinStore } from "@/stores/skin";

// 스토어 실행 및 반응형 변수 가져오기
const appStore = useAppStore();
const { title } = storeToRefs(appStore);

const skinStore = useSkinStore();
const { skins, selectedIndex } = storeToRefs(skinStore);

// 스토어에서 가져온 데이터로 `skinType` 변수를 초기화합니다.
// **주의**: `skins.value`가 아직 로드되지 않았을 경우, 이 코드는 오류를 발생시킵니다.
const QualityTips = skins.value[selectedIndex.value]
const skinType = QualityTips.skin_type

// 컴포넌트가 마운트될 때(화면에 처음 나타날 때) 실행되는 훅입니다.
onMounted(() => {
  console.log(`SeasonRoutineView::onMounted 호출됨`);
  title.value ='홈'; // 페이지 타이틀을 '홈'으로 설정합니다.

  // 콘솔에 현재 인덱스와 선택된 객체 정보를 출력합니다.
  console.log(`현재 선택된 인덱스 > ${selectedIndex.value}`)
  console.log(`현재 선택된 객체 > ${skins.value[selectedIndex.value]}`);

  requestSkinSeason() // 서버에서 특징 및 팁 데이터를 가져오는 함수를 호출합니다.
})

// ===== 계절별 루틴 팁 API 호출 (목록) =====
// 서버로부터 특징 및 팁 데이터를 가져오는 비동기 함수입니다.
async function requestSkinSeason() {
  try{
    // `QualityTips.season`에서 `id` 값을 추출합니다.
    const id = QualityTips.id

    // `axios`를 사용하여 서버에 `POST` 요청을 보냅니다.
    const response = await axios({
      method: 'post', // POST 메소드 사용
      baseURL: requestConfig.baseUrl,
      url: `/skin/season/${id}`, // URL 경로에 id 값을 포함시킵니다.
      timeout: 5000, // 요청이 5초 안에 응답이 없으면 타임아웃됩니다.
      responseType: "json" // 응답 데이터 형식을 JSON으로 지정합니다.
    })
    console.log(`응답 -> ${JSON.stringify(response.data.data.data)}`)

  } catch (err) {
    // API 요청 실패 시 에러를 콘솔에 출력합니다.
    console.error(`에러 -> ${err}`);
  }
}

// '뒤로가기' 버튼 클릭 시 실행되는 함수
function goToProblem() {
  router.replace('/problem') // `/problem` 경로로 이동합니다.
}
</script>

<style scoped>
/*
`scoped`: 이 스타일이 현재 컴포넌트에만 적용되도록 제한합니다.
*/
</style>