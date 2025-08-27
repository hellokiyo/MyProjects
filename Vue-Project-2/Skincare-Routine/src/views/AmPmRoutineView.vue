<template>
  <div class="row g-3 mb-5">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <span class="fs-1 fw-bold text-primary">{{skinType}} 타입</span>
        <p>아침/저녁 루틴</p>

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

// 스토어 파일들을 불러옵니다. @는 src 디렉토리를 의미하는 별칭입니다.
import { useAppStore } from "@/stores/app";
import router from "@/router/index.js";
import axios from 'axios';
import {requestConfig} from "../../app.config.js";
import { useSkinStore } from "@/stores/skin";

// 스토어 실행 및 반응형 변수 가져오기
const appStore = useAppStore();
const { title } = storeToRefs(appStore); // appStore의 title 상태를 반응형으로 가져옵니다.

const skinStore = useSkinStore();
const { skins, selectedIndex } = storeToRefs(skinStore); // skinStore의 skins, selectedIndex 상태를 가져옵니다.

// 스토어에서 가져온 데이터로 skinType 변수를 초기화합니다.
// 이 코드는 skins.value와 selectedIndex.value에 값이 없을 경우 오류를 발생시킬 수 있습니다.
const QualityTips = skins.value[selectedIndex.value]
const skinType = QualityTips.skin_type

// 컴포넌트가 마운트될 때(화면에 처음 나타날 때) 실행되는 훅입니다.
onMounted(() => {
  console.log(`ProblemView::onMounted 호출됨`);

  title.value ='홈'; // 페이지 타이틀을 '홈'으로 설정합니다.

  // 콘솔에 현재 인덱스와 선택된 객체 정보를 출력합니다.
  console.log(`현재 선택된 인덱스 > ${selectedIndex.value}`)
  console.log(`현재 선택된 객체 > ${skins.value[selectedIndex.value]}`);

  requestSkinQualityTips() // 서버에서 특징 및 팁 데이터를 가져오는 함수를 호출합니다.
})

// =====  특징 및 케어 팁 API 호출 (목록) =====
// 서버로부터 특징 및 팁 데이터를 가져오는 비동기 함수
async function requestSkinQualityTips() {
  try{
    // QualityTips.id에서 id 값을 추출합니다.
    const id = QualityTips.id

    // axios를 사용하여 서버에 POST 요청을 보냅니다.
    const response = await axios({
      method: 'post', // POST 메소드 사용
      baseURL: requestConfig.baseUrl,
      url: `/skin/quality_tips/${id}`, // URL 경로에 id 값을 포함시킵니다.
      timeout: 5000,
      responseType: "json"
    })
    console.log(`응답 -> ${JSON.stringify(response.data.data.data)}`)

  } catch (err) {
    // API 요청 실패 시 에러를 콘솔에 출력합니다.
    console.error(`에러 -> ${err}`);
  }
}

// '뒤로가기' 버튼 클릭 시 실행되는 함수
function goToProblem() {
  router.replace('/problem') // '/problem' 경로로 이동합니다.
}
</script>

<style scoped>
/*
scoped: 이 스타일이 현재 컴포넌트에만 적용되도록 제한합니다.
*/
</style>