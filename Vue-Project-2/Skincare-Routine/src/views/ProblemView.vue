<template>
  <!-- 추천 섹션 -->
  <div class="row g-3 mb-5">
    <!--
    g-3 > 카드 사이간격 3단계로 설정
    -->
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <span class="fs-1 fw-bold text-primary">피부 고민 해결!</span>
      </div>
    </div>

    <div v-for="(item, index) in cards" :key="item.id" class="col-6 d-flex justify-content-center align-items-center">
      <div class="card"
           :style="{
            height: `200px`,
            width: `290px`,
            backgroundImage :  `url(${item.bg})`,
            backgroundSize : 'cover',
            backgroundPosition : 'center',
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
import {onMounted, ref} from 'vue'

//스토어 불러오기
// 1. storeToRefs 불러오기
import { storeToRefs } from "pinia";

// 2. 내 스토어(app.js) 불러오기
import { useAppStore } from "@/stores/app";

// 3. 스토어 실행 (실제로 가져오기)
const appStore = useAppStore();

// 4. 반응형으로 가져오기
const { title } = storeToRefs(appStore);

onMounted(() => {
  console.log(`HomeView::onMounted 호출됨`);

  title.value ='홈';

})

/* 스킨 타입별

const skinType = ref("")

function selectSkinType() {

  switch ()
    case:
      skinType.value = "수분 부족형 지성"
    case:
      skinType.value = "민감성 지성"
    case:
      skinType.value = "건성 지성"
    case:
      skinType.value = "복합성 지성"

}
*/

//cards_link의 사진주소 경로를 변수에 담기
const card_img = 'src/assets/images/skin/skin'

// cards에 json형식으로 객체 생성
const cards =ref( [
  { id :1, title: '문제점 및 해결방안', bg: `${card_img}1.png` },
  { id :2, title: '아침/저녁 루틴', bg: `${card_img}2.png` },
  { id :3, title: '계절별 피부 관리 루틴', bg: `${card_img}3.png`},
  { id :4, title: '제품 추천 및 최저가 링크', bg: `${card_img}4.png`}
])

</script>

<style scoped>

</style>
