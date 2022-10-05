<template>
    <div id="music-container" class="music">
        <div class="background-blur"></div>
        <div class="back">
            <MyIcon icon="#icon-xiajiantou" fill="rgb(248,248,248)" width=".5rem" @click="musicStore.bottomOpen=false">
            </MyIcon>
        </div>
        <div class="music-title">
            <div class="music-title-name">{{musicStore.curPlay.name}}</div>
            <div class="music-title-authors">
                {{musicStore.authors}}
                <MyIcon icon="#icon-youjiantou" fill="rgba(255,255,255,.8)" width=".3rem"></MyIcon>
            </div>
        </div>
        <div class="music-cd">
            <img class="needle" src="../../assets/zhen.png"
                :class=" musicStore.curPlay.flag?'needle-active':'needle-not-active'" />
            <img ref="cd" class="cd" src="../../assets/cd.png" />
            <img ref="albumPic" class="album" :src="musicStore.curPlay.album.picUrl">
        </div>
        <div ref="lyric" class="music-lyric">
            <p v-for=" (item,i) in musicStore.curPlay.lyric" :key="item.key"
                :class="{'p-active':musicStore.curLyricIndex==i}">
                {{item.content}}
            </p>
        </div>
        <div class="music-control">
            <div class="music-control-up">
                <MyIcon icon="#icon-aixin" width=".5rem" fill="white"></MyIcon>
                <MyIcon icon="#icon-download" width=".5rem" fill="white"></MyIcon>
                <MyIcon icon="#icon-xiaoxi" width=".5rem" fill="white"></MyIcon>
                <MyIcon icon="#icon-sound" width=".5rem" fill="white"></MyIcon>
                <MyIcon icon="#icon-gengduo-shuxiang" width=".5rem" fill="white"></MyIcon>
            </div>
            <div class="music-control-middle">
                <text>{{musicStore.formatCurTime}}</text>
                <MyProgress></MyProgress>
                <text>{{musicStore.formatDuration}}</text>
            </div>
            <div class="music-control-down">
                <MyIcon :icon="musicStore.playType[musicStore.playTypeIndex].icon" width=".5rem" fill="white"
                    @click="musicStore.changePlayType"></MyIcon>
                <MyIcon icon="#icon-shangyishou" fill="white" width=".5rem" @click="musicStore.preSong"></MyIcon>
                <MyIcon :icon="musicStore.curPlay.flag?'#icon-zanting':'#icon-bofang'" fill="white" width=".8rem"
                    @click="musicStore.playOrStop"></MyIcon>
                <MyIcon icon="#icon-xiayishou" fill="white" width=".5rem" @click="musicStore.nextSong"></MyIcon>
                <MyIcon icon="#icon-bofangliebiao" width=".5rem" fill="white"></MyIcon>

            </div>
        </div>
    </div>
</template>
<script setup>
import { useMusicStore } from '../../store/musicStore';
import MyIcon from '../../components/MyIcon.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import MyProgress from '../../components/MyProgress.vue';

const musicStore = useMusicStore();
const lyric = ref(null)

/**
 * 监听是否播放，控制cd转动
 */
let requestId;
let curAngle = 0;
const cd = ref(null);
const albumPic = ref(null);

const CDRotate = function () {
    curAngle = curAngle + 0.2;
    cd.value.style.transform = `rotate(${curAngle}deg)`
    albumPic.value.style.transform = `rotate(${curAngle}deg)`
    requestId = window.requestAnimationFrame(CDRotate);
}
onMounted(() => {
    let dom = document.getElementById("music-container")
    dom.style.backgroundImage = `url(${musicStore.curPlay.album.picUrl})`
    dom.style.backgroundSize = "cover";
    if (musicStore.curPlay.flag) {
        requestId = window.requestAnimationFrame(CDRotate);
    }
})
/**
 * 监听歌曲切换
 */
watch(() => musicStore.curPlay, () => {
    let dom = document.getElementById("music-container")
    dom.style.backgroundImage = `url(${musicStore.curPlay.album.picUrl})`
    dom.style.backgroundSize = "cover";
})



watch(() => musicStore.curPlay.flag, (value) => {
    if (value) {
        requestId = window.requestAnimationFrame(CDRotate);
    } else {
        window.cancelAnimationFrame(requestId);
        console.log(requestId)
    }
})

watch(() => musicStore.curLyricIndex, (newValue, oldValue) => {
    let curP = lyric.value.children[newValue];
    curP.scrollTop = 10;
    let offset = curP.offsetTop - lyric.value.offsetHeight / 2 + curP.offsetHeight / 2;
    lyric.value.scrollTo({ top: offset, behavior: 'smooth' })
})


</script>
<style lang="less">
@import './vertical.less';
@import './horizontal.less';
</style>