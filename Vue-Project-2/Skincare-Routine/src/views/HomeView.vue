<template>
  <!-- 추천 섹션 -->
  <div class="row g-3 mb-5">
    <!--
    row > 가로로 나열한 그리드
    g-3 > 카드 사이간격 3단계로 설정
    mb-5 > 마진 바텀 5단계 크기
    -->

    <!--오늘의 등산로 카드-->
    <div class="col-6">
      <!--
      화면을 12칸으로 나눴을때 세로로 6칸 차지하는 영역 만들기
      -->
      <div class="card text-white h-100"
           :style="{
                   backgroundImage: `url(${cards[0].bg})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'}"
      >
          <!--
           text-white > 흰색 글씨
           h-100 > height -100% 부모요소의 높이에 맞게 꽉차게
           :style 동적 스타일속성 바인딩
           backgroundImage: `url(${cards[0].bg})` > 배경 이미지 url 설정 > 배열에 들어있는 bg값으로 지정
           backgroundSize: 'cover',  배경 이미지가 카드를 꽉 채우기
           backgroundPosition: 'center'}" 배경이미지를 중앙 위치
          -->

        <div class="card-body d-flex flex-column justify-content-center">
          <!--
          card-body card-body의 설정을 가져옴
          justify-content-center 자식 요소를 가운데 정렬
          -->
          <h5 class="text-white fw-bold mb-2">{{cards[0].title}}</h5>
          <span class="text-white-75">{{cards[0].ex}}</span>
        </div>
      </div>
    </div>

    <!--오늘의 민원신청, 긴급 카드-->
    <div class="col-6">
      <div class="card text-white h-100">
        <!--민원신청 카드-->
        <div v-for="n in 2" :key="n">
          <div class="card-body bg-warning d-flex flex-column justify-content-center mb-1" style="border-radius: 8px"
               :style="{
                   backgroundImage: `url(${cards[n].bg})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'}"
          >
            <h5 class="text-white fw-bold mb-2">{{cards[n].title}}</h5>
            <span class="text-white">{{cards[n].ex}}</span>
          </div>
        </div>
      </div>
    </div>

    <!--등산 카드-->
    <div  v-for="n in 2" :key="n" class="col-6">
      <div class="card text-white h-100"
           :style="{
                   backgroundImage: `url(${cards[n+2].bg})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'}"
      >
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="text-white fw-bold mb-2">{{cards[n+2].title}}</h5>
          <span class="text-white">{{cards[n+2].ex}}</span>
        </div>
      </div>
    </div>

    <!--어서와 등산은 처음이지 -->
    <div class="mb-4">
      <h5 class="fw-bold mb-3">어서와 등산은 처음이지?</h5>
      <span class="text-gray-600 ">요즘 뜨는 등산멘트</span>
      <div class="d-flex flex-row overflow-auto">

        <div v-for="n in 6" :key="n" class="me-3 px-1">
          <div class="symbol symbol-60px">
            <img :src="`/assets/media/avatars/300-${n}.jpg`"/>
          </div>
        </div>

      </div>
    </div>

    <!-- 지금 가장 핫한 게시물 -->
    <div class="mb-20">
      <h5 class="fw-bold mb-5">지금 가장 핫한 게시물 🔥</h5>
      <div class="d-flex flex-row overflow-auto">

        <div v-for="n in 3" :key="n" class="me-3">
          <div class="card h-100 w-200px">
            <img :src="`/assets/media/books/${n}.png`"/>
            <div class="card-body">
              <h6 class="fw-bold">게시물 {{ n }}</h6>
            </div>
          </div>
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


//cards_link의 사진주소 경로를 변수에 담기
let cards_link = '/assets/media/stock/600x400/'

// cards에 json형식으로 객체 생성
const cards =ref( [
  { id :1, title: '오늘의 등산로', ex: '등산로 보기', bg: `${cards_link}img-20.jpg` },
  { id :2, title: '민원신청', ex: '불편, 개선사항 접수', bg: `${cards_link}img-15.jpg` },
  { id :3, title: '긴급', ex: 'sos신고', bg: `${cards_link}img-24.jpg`},
  { id :4, title: '등산', ex: '나만의 등산기록', bg: `${cards_link}img-18.jpg`},
  { id :5, title: '커뮤니티', ex: '#오등완 #등린이', bg: `${cards_link}img-25.jpg`}

])

</script>

<style scoped>

</style>
