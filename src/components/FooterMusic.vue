<template>
    <div v-show="store.curIndex!=-1" class="footer-music">
        <div class="footer-music-pic">
            <img :src="store.curPlay.album.picUrl">
        </div>
        <div class="footer-music-control">
            <MyIcon icon="#icon-shangyishou" fill="red" width=".4rem"></MyIcon>
            <MyIcon icon="#icon-zanting1" fill="red" width=".7rem"></MyIcon>
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
            <div class="footer-music-progress">
                <!-- <van-progress :percentage="50" color="red" stroke-width=".04rem" track-color="rgb(218,218,218)"  pivot-text="" ></van-progress> -->
                <input type="range"  min="0" :max="store.curPlay.duration" v-model="store.currentTime" step="0.05" />
            </div>
        </div>
        <div class="footer-music-right"></div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${store.curPlay.id}.mp3`"></audio>
    </div>

</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useStore } from '../store';
import MyIcon from './MyIcon.vue';
import changeTime from '../utils/changeTime'

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

        .footer-music-progress input{
            width: 100%;
            background-color: red;
            color: red;
        }
    }
}
</style>