import { ref } from "vue";
import { defineStore } from "pinia";

// post.js는 글쓰기를 위한 것 (현재는 app.js 예시)
export const useAppStore = defineStore('app', () => {

    // 전체화면 모드 여부 (true면 상단 헤더/하단 탭 숨김)
    const fullscreen = ref(false);

    // 현재 페이지 타이틀
    const title = ref('');

    // storeToRefs에서 가져다 쓸 수 있도록 return
    return {
        fullscreen, title
    }
})
