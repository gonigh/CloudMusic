<template>
    <div v-show="store.curIndex!=-1" class="footer-music">
        <div class="footer-music-pic">
            <img :src="store.curPlay.album.picUrl">
        </div>
        <div class="footer-music-control">
            <MyIcon icon="#icon-shangyishou" fill="red" width=".4rem"></MyIcon>
            <MyIcon :icon="store.curPlay.flag?'#icon-zanting2':'#icon-zanting1'" fill="red" width=".7rem" @click="handlePlayOrStop"></MyIcon>
            <MyIcon icon="#icon-xiayishou" fill="red" width=".4rem"></MyIcon>
        </div>
        <div class="footer-music-middle">
            <div class="footer-music-info">
                <div>
                    <text style="font-size: .36rem;">{{store.curPlay.name}}</text>
                    <text style="color: #919191;font-size: .36rem;"> - {{authors}}</text>
                </div>
                <div>
                    <text>{{store.curPlay.name}}</text>
                    <text style="color: #919191;">/{{state.duration}}</text>
                </div>
            </div>
            <MyProgress></MyProgress>
        </div>
        <div class="footer-music-right"></div>
        <audio autoplay ref="audio" :src="store.curPlay.url"></audio>
    </div>

</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useStore } from '../store';
import MyIcon from './MyIcon.vue';
import changeTime from '../utils/changeTime'
import MyProgress from './MyProgress.vue';

const store = useStore();
let authors = ref("");
const audio=ref(null)
const state = reactive({
    duration:String
})
if(store.curIndex!=-1) authors.value = store.curPlay.authors.map(i=>i.name).join('/')
/**
 * 初试状态隐藏，播放歌曲后弹出
 */
watch(()=>store.curIndex,(value)=>{
    console.log(value)
    if(store.curPlay.flag){
        let dom = document.getElementsByClassName("footer-music")[0];
        dom.style.transform = "unset";
    }
})


watch(()=>store.curPlay.id,()=>{
    authors.value = store.curPlay.authors.map(i=>i.name).join('/')
    state.duration = changeTime(store.curPlay.duration);
})

/**
 * 播放暂停按钮
 */
const handlePlayOrStop = ()=>{
    if(store.curPlay.flag){
        audio.value.pause();
    }else{
        audio.value.play();
    }
    store.playOrStop();
}


</script>
<style lang="less">
.footer-music {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1.8rem;
    background-color: rgba(250, 250, 250, .8);
    backdrop-filter: blur(20px);
    z-index: 3000;
    border-top: .5px solid rgba(118, 118, 118, 0.5);
    // transform: translateY(2rem);
   
    transition-duration: .4s;
    display: flex;
    align-items: center;
    padding: .4rem;
    .footer-music-pic{
        img{
            height: 1rem;
            width: 1rem;
        }
    }
    .footer-music-control{
        width: 4rem;
        display: flex;
        padding: 0 .8rem;
        justify-content: space-between;
        align-items: center;
    }
    .footer-music-middle{
        flex: 1;
        height: 100%;
        .footer-music-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 90%;
            text{
                font-size: .3rem;
            }
        }
    }
}

</style>