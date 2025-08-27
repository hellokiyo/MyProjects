<template>
  <div class="d-flex flex-column h-100">
    <!--
      d-flex 내부요소(버튼, 제목)들을 flex로 정렬
      flex-column 세로방향으로 정렬
      h-100 화면 꽉차게 height 100%
     -->

    <!-- 상단 헤더: fullscreen이 아닐 때만 보임 -->
    <div v-if="!fullScreen" class="app-header d-flex align-items-center justify-content-between border-bottom bg-white p-2">
      <!--
      v-if="!fullScreen" 화면이 꽉차지 않았을때 (앱 화면)
      d-flex (default : flex- row)  d-flex만 쓰면 기본값이 row임 > 가로정렬
      justify-content-between 양 끝 배치하고 그 사이 균등한 공간 두기
      border-bottom 아래쪽 얇은 테두리 선 추가
      bg-white 배경색 흰색
      p-2 상하좌우에 2단계 크기의 여백을 줌

      -->
      <!-- 좌측 햄버거 버튼 (드로어 열기용) -->
      <button class="btn btn-icon btn-light" id="kt_app_sidebar_mobile_toggle">
        <!--메뉴창
        btn 부트스트랩 버튼 스타일 적용
        btn-icon 버튼안에 아이콘만 들어갈때 사용
        btn-light 연한 회색 배경 버튼 스타일 적용
        id 메트로닉식 이름짓기 사이드바에 이벤트기능 추가하기 위한 id값 부여
        -->

        <i class="ki-duotone ki-abstract-14 fs-2x text-primary">
          <!--Keenicons 라이브러리 - 메트로닉 사이트 -icon - keenicon - ctrl+f로 원하는 기능 찾기 복붙 하면 됨
          ki-abstract-14 아이콘 구체적인 모양
          fs-2x 글꼴크기 2배 키우기
          text-primary 텍스트(아이콘) 색상 파란색 지정
          -->
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </button>

      <!-- 가운데 타이틀 (Pinia store의 title 값 표시) -->
      <span class="fs-2 fw-bold "@click="goToHome">{{ title }}</span>
      <!--
      fs-2 글꼴 크기 크게 만들기
      fw-bold > bolod체 글씨 굵게
      @click="goToHome" 클릭시 함수실행하는 이벤트 리스너
      {{ title }} 데이터 바인딩 title변수값을 동적으로 가져오기
      -->
      <!-- 우측 로그인 버튼 -->
      <button class="btn btn-icon btn-light" @click="goToLogin()">
        <i class="ki-duotone ki-setting-2 fs-2x text-primary">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </button>

    </div>
    <!--
    fullScrenn > vue 디렉티브
    app-header > 메트로닉 커스텀 속성임
    d-flex : 부트스트랩 유틸리티 클래스 / display: flex;속성을 적용한다. / 이 요소의 자식들의 button, span등 유연하게 정렬,배치함 /
    align-content-center : 부트스트랩 유틸리티 클래스 / flex 컨테이너 자식 요소들을 수직방향에 따라 정렬 > 자식요소들이 수직방향으로 가운데 위치/
    justify-content-between : 부트스트랩 유틸리티 클래스 / flex 컨테이너 자식 요소들을 수평방향에 따라 정렬 > / between 첫번째와 마지막 항목을 양끝에 배치
    나머지 항목들 사이에 동일한 간격을 만듬 / ex 왼쪽 햄버거 버튼, 가운데 타이틀, 오른쪽 로그인 버튼을 양끝과 중앙에 깔끔하게 배치
    border-bottem : 부트스트랩 유틸리티 클래스 / 아랫쪽에 얇은 테두리 추가
    bg-white : 부트스트랩 유틸리티 클래스 / background-color를 흰색으로 설정
    p-2 : 부트스트랩의 유틸리티 클래스 /padding을 2단계
    -->

    <!-- 메인 컨텐츠 -->
    <div class="flex-grow-1 overflow-auto bg-light p-4" style="padding-bottom: 80px;">
      <!--
      flex-grow-1 > 화면에서 사용가능한 남은공간 모두 차지
      overflow-auto  > 내용 넘칠 경우 스크롤 기능
      bg-light > 배경색 연한회색(메트로닉)
      p-4 > 상하좌우 패딩 4
      -->

      <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
        <RouterView />
      </div>

    </div>

    <!-- 하단 탭 -->
    <div class="fixed-bottom d-md-none bg-white border-top">
      <!--
      fixed-bottom 하단에 메뉴 고정시키기 스크롤 내려도 항상 자리에 유지
      d-md-none medium 사이즈 이상의 화면(PC,태블릿)에서는 메뉴창 숨기기(앱 전용)
      border-top 위쪽에 선 추가
      -->
      <div class="menu menu-row d-flex justify-content-around py-2 fs-6 fw-bold cursor-pointer">
        <!--
        d-flex justify-content-around 내부의 메뉴 아이템들을 가로로 균등 배치
        py-2  패딩 y축(위아래)
        fs-6 글씨 크기 6단계로 조정
        fw-bold 글씨 굵게(bold체)
        cursor-pointer  마우스 커서가 올라갔을때 모양 바꾸기
        -->
        <div v-for="tab in tabs" :key="tab.key"
             class="menu-item flex-column align-items-center flex-fill tab-btn"
             :class="{active: activeTab===tab.key}"
             @click="tabButtonClicked(tab.key)">
          <!--
          v-for
          -->

          <span class="menu-icon mb-1" v-html="tab.icon">
          </span>
          <span class="menu-title">{{tab.title}}</span>
        </div>
      </div>
    </div>

    <!-- 드로어 (좌측 사이드 메뉴) -->
    <div id="kt_drawer_basic1"
         class="bg-white d-flex flex-column drawer-hidden"
         data-kt-drawer="true"
         data-kt-drawer-activate="true"
         data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
         data-kt-drawer-width="{default: '250px', 'md': '500px'}"
         data-kt-drawer-direction="start">

      <!-- 드로어 상단 -->
      <div class="p-5 border-bottom">
        <h3>메뉴</h3>
      </div>
      <!-- 내 정보 -->
      <div class="p-5 border-bottom">
        <div class="row">

          <div class="col-3">
            <img src="@/assets/images/clock.png" class="w-70px border border-4">
          </div>

          <div class="col-9 px-10 pt-4">
            <span class="fw-bold">박정훈님 환영합니다.</span><br>
            <span >환영합니다</span>
          </div>

        </div>
      </div>

      <!-- 드로어 메뉴 아이템 -->
      <div v-for="sidebar in sidebars" :key="sidebar.key" class="p-5">
        <div class="menu menu-column fs-6 fw-bold">
          <!-- 메뉴 항목 예시 -->
          <div class="menu-item" @click="tabButtonClicked(sidebar.key)">
            <div class="menu-link bg-light-secondary text-dark px-4 py-2 rounded">
              <span class="menu-icon" v-html="sidebar.icon">
              </span>
              <span class="menu-title m-2">{{sidebar.title}}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 드로어 닫기 버튼 -->
      <div class="m-10">
        <button class="btn btn-sm btn-primary" @click="closeDrawer()">닫기</button>
      </div>

    </div>
  </div>
</template>

<script setup>
// Vue 및 외부 라이브러리 import
import {ref, onMounted} from "vue";
import {useRouter} from 'vue-router'
const router = useRouter();

// Pinia 스토어 불러오기
import { storeToRefs } from "pinia";          // store 속성을 반응형으로 가져오기 위함
import { useAppStore } from "@/stores/app";
const appStore = useAppStore();              // 스토어 인스턴스 생성

const { title } = storeToRefs(appStore);     // title을 반응형으로 구조분해할당

const activeTab = ref('home') // 활성화된 탭의 키를 저장하는 반응형 변수

// 전체 화면으로 보일 것인지의 여부
const { fullScreen } = ref(false) // fullScreen 변수 정의

// 드로어 인스턴스 변수
let drawer;

// 컴포넌트 마운트 시 실행
onMounted(() => {
  console.log(`app::onMounted 호출됨.`);

  // Drawer 초기화 (KTDrawer 라이브러리)
  // 메트로닉 템플릿의 자바스크립트 함수를 사용하여 드로어 컴포넌트를 초기화합니다.
  KTDrawer.createInstances();

  // 드로어 엘리먼트 가져오기
  const drawerElem = document.querySelector('#kt_drawer_basic1');
  drawer = KTDrawer.getInstance(drawerElem);

  // 드로어 이벤트 리스너
  // 드로어가 열릴 때와 닫힐 때 클래스를 추가/제거하여 상태를 제어합니다.
  drawer.on('kt.drawer.shown', () => {
    console.log(`Drawer가 보여짐`);
    drawerElem.classList.remove('drawer-hidden');
  })
  drawer.on('kt.drawer.hidden', () => {
    console.log(`Drawer가 사라짐`);
    drawerElem.classList.add('drawer-hidden');
  })
})

// 드로어 닫기 함수
function closeDrawer() {
  console.log(`closeDrawer 호출됨`);
  if (drawer) {
    drawer.hide(); // 드로어를 숨깁니다.
  }
}

// 하단 탭의 버튼이 눌렸을 때
// @param name: 클릭된 탭의 key 값
function tabButtonClicked(name) {
  console.log(`tabButtonClicked 호출됨`);

  activeTab.value = name;

  //메인 영역의 화면 전환하기
  if(name === 'home') {
    goToHome();
  }else if(name === 'search') {
    goToSearch();
  }
  else if(name === 'post') {
    goToPost();
  }
  else if(name === 'more') {
    goToMore();
  }else if(name === 'user') {
    goToUser()
  }else if(name === 'video') {
    goToVideo()
  }
}

// 메인 페이지로 이동하는 함수
function goToHome() {
  router.push('/') // Vue Router를 사용하여 경로를 변경합니다.
}

// 검색 페이지로 이동하는 함수
function goToSearch() {
  router.push('/search')
}

// 문제점 페이지로 이동하는 함수 (현재 코드에서는 사용되지 않음)
function goToProblem() {
  router.push('/problem')
}

// 비디오 페이지로 이동하는 함수
function goToVideo() {
  router.push('/video')
}

// 드로어 사이드 바 메뉴 데이터를 정의하는 반응형 변수
const sidebars = ref([
  {
    key : 'home',
    title :'홈',
    icon:'<i class="ki-duotone ki-home fs-2x text-primary"></i>\n'
  },
  {
    key : 'search',
    title:'찾기',
    icon :'<i class="ki-duotone ki-parcel-tracking fs-2x">\n' +
        '    <span class="path1"></span>\n' +
        '    <span class="path2"></span>\n' +
        '    <span class="path3"></span>\n' +
        '</i>'
  },
  {
    key : 'user',
    title : '마이페이지' ,
    icon :'<i class="ki-duotone ki-user">\n' +
        ' <span class="path1"></span>\n' +
        ' <span class="path2"></span>\n' +
        '</i>'
  }
])

// 하단 탭 메뉴 데이터를 정의하는 반응형 변수
const tabs = ref([
  { key: 'home', title: '홈', icon: '<i class="ki-duotone fs-2x ki-home">\n</i>' },

  { key: 'search', title: '검색', icon: '<i class="ki-duotone fs-2x ki-map">\n' +
        ' <span class="path1"></span>\n' +
        ' <span class="path2"></span>\n' +
        ' <span class="path3"></span>\n' +
        '</i>' },
  { key: 'post', title: '게시물', icon: '<i class="ki-duotone fs-2x ki-people">\n' +
        ' <span class="path1"></span>\n' +
        ' <span class="path2"></span>\n' +
        ' <span class="path3"></span>\n' +
        ' <span class="path4"></span>\n' +
        ' <span class="path5"></span>\n' +
        '</i>'},
  { key: 'video', title: '영상', icon: '<i class="ki-duotone ki-youtube">\n' +
        ' <span class="path1"></span>\n' +
        ' <span class="path2"></span>\n' +
        '</i>'}
])


</script>

<style scoped>
/* 드로어 숨김 상태 */
.drawer-hidden {
  transform: translateX(-100%);
  visibility: hidden;
}

.tab-btn {
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.25s ease-in-out;
}
.tab-btn.active {
  background-color: rgba(15,110,253,0.1);
  color: var(--bs-primary) !important;
}
.tab-btn.active .menu-icon i {
  color: var(--bs-primary) !important;
}
</style>