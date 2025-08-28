<template>
  <div class="card row content-bg bg-cover bg-center" style="background-image: url('src/assets/svg/pado.svg')">

    <div class="card-body d-flex flex-column justify-content-end align-items-center p-3">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <label class="fs-sm-3hx">아침/저녁 루틴</label>
      </div>
    </div>



    <!-- =========== 주 내용 시작 ===========-->
    <div class="card-body row">
      <div class="card bgi-position-center bgi-size-cover w-100 m-3" style="
        background-image: url('src/assets/images/skin/skin2.png');
        height:280px;">
      </div>

      <!--아침루틴-->
      <div class="d-flex flex-column rounded p-5 mb-4">
        <div class="border-bottom-dashed">
          <label class="fw-bold fs-4">아침루틴</label>
        </div>

        <div>
          <p>{{selectedSkin.morning_routine}}</p>
        </div>
      </div>

      <!--저녁루틴-->
      <div class="d-flex flex-column rounded p-5 mb-4">
        <div class="border-bottom-dashed">
          <label class="fw-bold fs-4">저녁루틴</label>
        </div>

        <div>
          <p>{{selectedSkin.evening_routine}}</p>
        </div>
      </div>


    </div>


    <div class="card-footer mb-20">
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

// 스토어에서 가져온 데이터로 `skinType` 변수를 초기화합니다.
// **주의**: `skins.value`가 아직 로드되지 않았을 경우, 이 코드는 오류를 발생시킵니다.
let ampm = ref({})
const selectedSkin  = skins.value[selectedIndex.value]



// 컴포넌트가 마운트될 때(화면에 처음 나타날 때) 실행되는 훅입니다.
onMounted(() => {
  console.log(`AmPmRoutineView::onMounted 호출됨`);

  title.value = selectedSkin.skin_type+'타입';  // 페이지 타이틀을 '스킨타입'으로 설정합니다.

  // 콘솔에 현재 인덱스와 선택된 객체 정보를 출력합니다.
  console.log(`현재 선택된 인덱스 > ${selectedIndex.value}`)
  console.log(`현재 선택된 객체 >`,selectedSkin);

  //requestSkinAmPm() // 서버에서 특징 및 팁 데이터를 가져오는 함수를 호출합니다.
})

/*// =====  아침 저녁 루틴 API 호출 (목록) =====
// 서버로부터 특징 및 팁 데이터를 가져오는 비동기 함수
async function requestSkinAmPm() {
  try{
    // selectedSkin.id에서 id 값을 추출합니다.
    const id = selectedSkin.id

    // axios를 사용하여 서버에 POST 요청을 보냅니다.
    const response = await axios({
      method: 'post', // POST 메소드 사용
      baseURL: requestConfig.baseUrl,
      url: `/skin/ampm/${id}`, // URL 경로에 id 값을 포함시킵니다.
      timeout: 5000,
      responseType: "json"
    })
    console.log(`응답 -> ${JSON.stringify(response.data.data.data[selectedIndex.value])}`)

    ampm.value = response.data.data.data[selectedIndex.value]

  } catch (err) {
    // API 요청 실패 시 에러를 콘솔에 출력합니다.
    console.error(`에러 -> ${err}`);
  }
}*/

// '뒤로가기' 버튼 클릭 시 실행되는 함수
function goToProblem() {
  router.push('/problem') // '/problem' 경로로 이동합니다.
}
</script>

<style scoped>
/*
scoped: 이 스타일이 현재 컴포넌트에만 적용되도록 제한합니다.
*/
</style>