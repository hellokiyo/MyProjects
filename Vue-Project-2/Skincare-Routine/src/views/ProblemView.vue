<template>
  <div class="row g-3 mb-5">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <span class="fs-1 fw-bold text-primary">{{skinType}} 피부 고민 해결!</span>
      </div>
    </div>

    <div v-for="(item, index) in cards" class="col-6 d-flex justify-content-center align-items-center" @click="item.method">
      <div class="card bgi-position-center bgi-size-cover"
           :style="{
            height: `200px`,
            width: `290px`,
            backgroundImage :  `url(${item.bg})`,
            opacity: 0.8
      }">
        <div class="card-body d-flex flex-column justify-content-center align-items-center">
          <span class="text-danger fs-5 fw-bold mb-2 bg-light-primary rounded p-3">{{item.title}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Vue의 Composition API 함수들을 불러옵니다.
import {onMounted, ref} from 'vue'

// Pinia 스토어를 가져오기 위한 import
import { storeToRefs } from "pinia";

// 스토어 파일들을 불러옵니다.
import { useAppStore } from "@/stores/app";
import router from "@/router/index.js";
import axios from 'axios';
import {requestConfig} from "../../app.config.js";
import { useSkinStore } from "@/stores/skin";

// 스토어 실행 및 반응형 변수 가져오기
const appStore = useAppStore();
const { title } = storeToRefs(appStore); // `title`을 반응형으로 가져옵니다.

const skinStore = useSkinStore();
const { skins, mode, selectedIndex } = storeToRefs(skinStore); // `skins`, `mode`, `selectedIndex`를 반응형으로 가져옵니다.

// 스토어의 `skins` 배열과 `selectedIndex`를 사용하여 `skinType` 변수를 초기화합니다.
// **주의**: `skins.value`가 아직 로드되지 않았을 경우, 이 코드는 오류를 발생시킵니다.
const skinType = skins.value[selectedIndex.value].skin_type

// 컴포넌트가 마운트될 때(화면에 처음 나타날 때) 실행되는 훅입니다.
onMounted(() => {
  console.log(`ProblemView::onMounted 호출됨`);
  title.value ='고민거리'; // 페이지 타이틀을 '홈'으로 설정합니다.

  // 콘솔에 현재 선택된 인덱스와 객체 정보를 출력합니다.
  console.log(`현재 선택된 인덱스 > ${selectedIndex.value}`)
  console.log(`현재 선택된 객체 > ${skins.value[selectedIndex.value].skin_type}`);

  // 서버에서 피부 타입 목록을 가져오는 함수를 호출합니다.
  requestSkinList()
})

// ===== API 호출 (목록) =====
// 서버로부터 피부 타입 목록 데이터를 가져오는 비동기 함수입니다.
async function requestSkinList() {
  try {
    const response = await axios({
      method: 'get',
      baseURL: requestConfig.baseUrl,
      url: '/skin/list',
      timeout: 5000,
      responseType: "json"
    })
    console.log(`응답 -> ${JSON.stringify(response.data.data.data[selectedIndex.value])}`)
  } catch (err) {
    console.error(`에러 -> ${err}`);
  }
}

// 이미지 경로를 저장하는 변수 (이 방식은 Vite에서 문제가 될 수 있음)
const card_img = 'src/assets/images/skin/skin'

// cards 배열: Vue에 표시할 카드 데이터
// `method`에 라우팅 함수를 직접 할당합니다.
const cards =ref( [
  {title: '문제점 및 해결방안', bg: `${card_img}1.png`,method : selectQualityTips },
  {title: '아침/저녁 루틴', bg: `${card_img}2.png`, method : selectAmPm },
  {title: '계절별 피부 관리 루틴', bg: `${card_img}3.png`, method : selectSeason},
  {title: '제품 추천 및 최저가 링크', bg: `${card_img}4.png`, method : selectGuide}
])

// '문제점 및 해결방안' 카드 클릭 시 실행되는 함수
function selectQualityTips() {
  console.log(`selectQualityTips 함수 호출됨`);
  router.push('/qualityTips'); // '/qualityTips' 경로로 이동합니다.
}

// '아침/저녁 루틴' 카드 클릭 시 실행되는 함수
function selectAmPm() {
  console.log(`selectAmPm 함수 호출됨`);
  router.push('/ampm'); // '/ampm' 경로로 이동합니다.
}

// '계절별 피부 관리 루틴' 카드 클릭 시 실행되는 함수
function selectSeason() {
  console.log(`selectSeason 함수 호출됨`);
  router.push('/season'); // '/season' 경로로 이동합니다.
}

// '제품 추천 및 최저가 링크' 카드 클릭 시 실행되는 함수
function selectGuide() {
  console.log(`selectGuide 함수 호출됨`);
  router.push('/guide'); // '/guide' 경로로 이동합니다.
}

</script>

<style scoped>
/*
scoped: 이 스타일이 현재 컴포넌트에만 적용되도록 제한합니다.
*/
</style>