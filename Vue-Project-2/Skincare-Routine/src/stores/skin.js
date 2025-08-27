import {defineStore} from 'pinia'
import {ref} from "vue";

export const useSkinStore = defineStore('skin', () =>{

    const skins = ref([])

    //지성, 민간섬, 건성, 복합성 화면 중 어떤 모드인지 구분하기 위한 변수상자
    const mode = ref('')

    // 배열 안의 아이템 중에서 몇 번째 아이템이 선택되어있는지에 대한 인덱스 값
    // -1은 아직 아무 항목도 선택되지 않았음을 의미
    const selectedIndex = ref(-1)

    return{
        skins, mode, selectedIndex
    }
})