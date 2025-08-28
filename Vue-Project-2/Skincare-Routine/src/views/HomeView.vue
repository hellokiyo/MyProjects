<template>
  <div class="row g-6 mb-20">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <span class="fs-1 fw-bold text-primary">무슨 피부 타입이세요?</span>
      </div>
    </div>

    <div v-for="(item, index) in cards" :key="item.id" class="col-6 d-flex justify-content-center align-items-center mb-10">
      <div class="d-flex flex-column align-items-center" @click="item.method(index)">
        <span class="text-gray fs-5 fw-bold mb-2 bg-light-primary rounded p-3" >{{item.type}}</span>
      </div>

      <div class="card bgi-position-center bgi-size-cover" @click="item.method(index)"
           :style="{
            height: `200px`,
            width: `290px`,
            backgroundImage :  `url(${item.bg})`,
            opacity: 0.8
      }">
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app";
import router from "@/router/index.js";
import axios from 'axios';
import {requestConfig} from "../../app.config.js";
import { useSkinStore } from "@/stores/skin";

// 스토어 실행 및 반응형 변수 가져오기
const appStore = useAppStore();
const { title } = storeToRefs(appStore);

const skinStore = useSkinStore();
const { skins, mode, selectedIndex } = storeToRefs(skinStore);

// 컴포넌트가 마운트될 때 실행되는 훅
onMounted(() => {
  console.log(`HomeView::onMounted 호출됨`);
  title.value ='홈'; // 페이지 타이틀을 '홈'으로 설정
  requestSkinList(); // API 호출 함수 실행
});

// ===== API 호출 (목록) =====
// 서버에서 피부 타입 목록 데이터를 가져오는 비동기 함수
async function requestSkinList() {
  try {
    const response = await axios({
      method: 'post',
      baseURL: requestConfig.baseUrl,
      url: '/skin/list',
      timeout: 5000,
      responseType: "json"
    });
    console.log(`응답 -> ${JSON.stringify(response.data.data.data)}`);
    skins.value = response.data.data.data; // 서버 응답 데이터를 Pinia 스토어에 저장
  } catch (err) {
    console.error(`에러 -> ${err}`);
  }
}

// 이미지 경로를 저장하는 변수 (이 방식은 Vite에서 문제가 될 수 있음)
const card_img = 'src/assets/images/skin/skintype';

// cards 배열: Vue에 표시할 카드 데이터
const cards = ref([
  { id: 1, type: '지성', method: oilyType, bg: `${card_img}1.png` },
  { id: 2, type: '민감성', method: sensitiveType, bg: `${card_img}2.png` },
  { id: 3, type: '건성', method: dryType, bg: `${card_img}3.png`},
  { id: 4, type: '복합성', method: combinationType, bg: `${card_img}4.png`}
]);

// 지성 타입 선택 시 실행되는 함수
function oilyType(index) {
  console.log(`oilyType 함수 호출됨, index: ${index}`);
  mode.value = 'oily'; // 스토어의 mode 값을 'oily'로 변경
  selectedIndex.value = index; // 스토어에 선택된 인덱스 저장
  router.push('/problem',{index}); // 'problem' 경로로 이동
}

// 민감성 타입 선택 시 실행되는 함수
function sensitiveType(index) {
  console.log(`sensitiveType 함수 호출됨, index: ${index}`);
  mode.value = 'sensitive';
  selectedIndex.value = index;
  router.push('/problem',{index});
}

// 건성 타입 선택 시 실행되는 함수
function dryType(index) {
  console.log(`dryType 함수 호출됨, index: ${index}`);
  mode.value = 'dry';
  selectedIndex.value = index;
  router.push('/problem',{index});
}

// 복합성 타입 선택 시 실행되는 함수
function combinationType(index) {
  console.log(`combinationType 함수 호출됨, index: ${index}`);
  mode.value = 'combination';
  selectedIndex.value = index;
  router.push('/problem',{index});
}

</script>

<style scoped>
/*
scoped: 이 스타일이 현재 컴포넌트에만 적용되도록 제한합니다.
*/
</style>