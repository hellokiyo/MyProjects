import {ref } from "vue";
import {defineStore} from "pinia";

// post.js는 글쓰기를 위한 것
export const usePostStore = defineStore('post',() => {

    //전체화면 모드 인지 여부 묻기 (전체화면 모드에서는 상단 타이틀과 하단 탭이 보이지 않음)
    const fullscreen =ref(false);


    return{
        fullscreen
    }
})
//
