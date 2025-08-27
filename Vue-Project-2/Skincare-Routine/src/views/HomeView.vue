<template>
  <!-- 추천 섹션 -->
  <div class="row g-6 mb-20">
    <!--
    g-3 > 카드 사이간격 3단계로 설정
    -->
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <span class="fs-1 fw-bold text-primary">피부 고민 해결!</span>
      </div>
    </div>

    <div v-for="(item, index) in cards" :key="item.id" class="col-6 d-flex justify-content-center align-items-center mb-10">

      <div class="d-flex flex-column align-items-center" @click="item.method">
        <span class="text-gray fs-5 fw-bold mb-2 bg-light-primary rounded p-3">{{item.type}}</span>
      </div>

      <div class="card"
           :style="{
            height: `200px`,
            width: `290px`,
            backgroundImage :  `url(${item.bg})`,
            backgroundSize : 'cover',
            backgroundPosition : 'center',
            opacity: 0.8
      }">
      </div>
    </div>
  </div>
</template>

<script setup>

import {onMounted, ref} from 'vue'

//스토어 불러오기
// 1. storeToRefs 불러오기
import { storeToRefs } from "pinia";

// 2. 내 스토어(app.js) 불러오기
import { useAppStore } from "@/stores/app";
import router from "@/router/index.js";

import axios from 'axios';
// 3. 스토어 실행 (실제로 가져오기)
const appStore = useAppStore();

// 4. 반응형으로 가져오기
const { title } = storeToRefs(appStore);

/*
// 페이지네이션 가져오기
const { makePagination } = usePagination()
const pagination1 = ref({})
*/

// 서버 주소 담김
import {requestConfig} from "../../app.config.js";

// 스킨 스토어 불러오기
import { useSkinStore } from "@/stores/skin";

// 스킨 스토어 실행(실제로 가져오기)
const skinStore = useSkinStore();

const { skins, mode, selectedIndex } = storeToRefs(skinStore)

onMounted(() => {
  console.log(`HomeView::onMounted 호출됨`);

  title.value ='홈';
  requestSkinList()

})


// ===== API 호출 (목록) =====
async function requestSkinList() {
  try{
    const response = await axios({
      method: 'get',  //값 가져오기만 할때
      baseURL: requestConfig.baseUrl,
      url: '/skin/list',
      timeout: 5000,
      responseType: "json"
    })
    console.log(`응답 -> ${JSON.stringify(response.data)}`)
    skins.value = response.data.data.data

  } catch (err) {
    console.error(`에러 -> ${err}`);
  }
}


//cards_link의 사진주소 경로를 변수에 담기
const card_img = 'src/assets/images/skin/skintype'

// cards에 json형식으로 객체 생성
const cards =ref( [
  { id :1, type: '지성', method : oilyType, bg: `${card_img}1.png` },
  { id :2, type: '민감성', method : sensitiveType, bg: `${card_img}2.png` },
  { id :3, type: '건성', method : dryType, bg: `${card_img}3.png`},
  { id :4, type: '복합성', method : combinationType,bg: `${card_img}4.png`}
])




function oilyType(index) {
  console.log(`oilyType 함수 호출됨, index: ${index}`);
  mode.value = 'oily';
  selectedIndex.value = index; // 선택된 인덱스 저장
  router.replace({ path: '/problem' });
}

function sensitiveType(index) {
  console.log(`sensitiveType 함수 호출됨, index: ${index}`);
  mode.value = 'sensitive';
  selectedIndex.value = index;
  router.replace({ path: '/problem' });
}

function dryType(index) {
  console.log(`dryType 함수 호출됨, index: ${index}`);
  mode.value = 'dry';
  selectedIndex.value = index;
  router.replace({ path: '/problem' });
}

function combinationType(index) {
  console.log(`combinationType 함수 호출됨, index: ${index}`);
  mode.value = 'combination';
  selectedIndex.value = index;
  router.replace({ path: '/problem' });
}


</script>

<style scoped>

</style>
