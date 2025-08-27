<template>
  <!--최상위 루트 컨테이너-->
  <div class="app-container flex-column flex-root" id="kt_app_root">

    <!--app-page 컨테이너-->
    <!--헤더 + 내용-->
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">

      <!--헤더-->
      <!--헤더에 들어갈 실제 내용-->
      <div id="kt_app_header" class="app-header d-flex justify-content-center">
        <h2>박정훈의 MBTI 간단 테스트</h2>
      </div>

      <!--app-wrapper 컨테이너-->
      <!--사이드 바 + 메인 내용-->
      <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">

        <!--사이드바 없음-->
        <!--메인 내용-->
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">


          <!--메인 내용내에서 페이지별 구분-->
          <div class="app-content flex-column-fluid d-flex justify-content-center" id="kt_app_content">


            <!--실제 만든 내용-->
            <div class="app-container container-xxl " id="kt_app_content_container">

              <div class="max-width w-100">

                <!--submit-->
                <!--기본적으로 Vue에서는 SPA방식이라 페이지가 새로고침 되면 모든 상태가 다 날라감-->
                <!--버튼을 눌렀을땐 새로고침이 자동으로 됨-->
                <!--.prevent를 사용하여 새로고침 방지-->
                <!--form을 사용할땐 form의 정보를 그대로 서버에 보내야해서 submit.prevent를 사용한다.-->
                <form @submit.prevent="calcMbti" class="form">
                  <!-- 질문 반복 -->

                  <div
                      v-for="(q, index) in questions"
                      :key="index"
                      class="row fv-row mb-7"
                  >
                    <!--q = item-->
                    <!--index에 item을 넣는 방식임-->
                    <!--반복문을 사용해서 배열에 값을 넣는 방식-->
                    <!--정확한 key값이 있다면 index를 사용하지않아도 된다.-->
                    <!--db를 배열에 넣을때 기본키가 있는 경우-->

                    <!-- 라벨 영역 -->
                    <!--만든 문제 질문이 들어감-->
                    <div class="col-md-12 mb-3">
                      <p class="fs-5 fw-bold">{{ index + 1 }}. {{ q.text }}</p>
                    </div>

                    <!-- 옵션 영역-->
                    <div class="col-md-12">
                      <!-- 옵션 -->
                    </div>


                    <!-- 선택지 영역 -->
                    <!--질문에 대한 답 2개중 1개를 고름(라디오 버튼)-->

                    <div class="col-md-12">
                      <div class="d-flex flex-column mt-3">
                        <div
                            v-for="option in q.options"
                            :key="option.value"
                            class="form-check form-check-custom form-check-solid mb-3"
                        >
                          <input
                              class="form-check-input"
                              type="radio"
                              :name="'q' + index"
                              :id="'q' + index + option.value"
                              :value="option.value"
                              v-model="answers[index]"
                          />
                          <label
                              class="form-check-label"
                              :for="'q' + index + option.value"
                          >
                            {{ option.label }}
                          </label>
                        </div>
                      </div>
                    </div>


                  </div>

                  <!-- 버튼 영역 -->
                  <div class="row py-5">
                    <div class="d-flex justify-content-center">
                      <div class="d-flex">
                        <button type="reset" class="btn btn-light me-3">취소</button>
                        <button type="submit" class="btn btn-primary">
                          <span class="indicator-label">결과 보기</span>
                          <span class="indicator-progress">
                            로딩중..
                            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>

            </div>
            <!--실제 만든 내용 끝-->


          </div>
          <!--메인 내용내에서 페이지별 구분 끝-->

        </div>
        <!--메인 내용 끝-->


      </div>
      <!--app-wrapper 컨테이너 끝-->


    </div>
    <!--app-page 컨테이너 끝-->

  </div>
  <!--최상위 루트 컨테이너 끝-->

</template>

<script setup>

import {ref} from "vue"; // Vue 3의 반응형 변수(ref) 사용
import {useRouter} from "vue-router"; // 페이지 이동(라우팅)을 위한 Vue Router
import questions from "@/data/mbtiQuestions.json"; // 질문 데이터(JSON 파일) 가져오기

// 라우터 객체 생성 (페이지 이동에 사용)
const router = useRouter();

// 사용자가 선택한 답변을 저장하는 배열 (초기값은 질문 개수만큼 "" 로 채움)
const answers = ref(Array(questions.length).fill(""));

/**
 * MBTI 결과 계산 함수
 */
function calcMbti() {
  // 1. 검증 단계: 한 문제라도 답변이 비어 있으면 경고 후 종료
  if (answers.value.some((a) => a === "")) {
    // 화살표 함수 응용
    // a의 값이 ""(공백 = 문제를 풀지않음)이라면   >>> 빈문자열은
    //some()은 하나라도 조건을 만족하면 true를 반환함
    //빈 문자열( (a) => a ==="" )은 true( some() )을 반환해라
    alert("모든 질문에 답변해주세요!");
    return;
  }


  // 2. MBTI 각 지표별 카운트 초기화
  const counts = {E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0};


  // 3. 사용자가 선택한 답변 배열(answers.value)을 순회하며 해당 알파벳 카운트 증가
  answers.value.forEach((ans) => {
    //ref로 만들어진 배열이기때문에 접근자체가 answers.value임
    counts[ans]++;
  });

  // 4. MBTI 계산: 각 지표별로 더 많은 쪽을 선택
  const mbti =
      (counts.E >= counts.I ? "E" : "I") + // 외향/내향
      (counts.S >= counts.N ? "S" : "N") + // 감각/직관
      (counts.T >= counts.F ? "T" : "F") + // 사고/감정
      (counts.J >= counts.P ? "J" : "P");  // 판단/인식

  // 5. 결과 페이지로 이동 (쿼리 파라미터로 MBTI 결과 전달)
  router.push({name: "mbtiResult", query: {mbti}});
}
</script>

