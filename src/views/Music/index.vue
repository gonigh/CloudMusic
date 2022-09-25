<template>
    <div id="music-container" class="music">
        <div class="background-blur"></div>
        <div class="back">
            <MyIcon icon="#icon-xiajiantou" fill="rgb(248,248,248)" width=".4rem" @click="musicStore.bottomOpen=false">
            </MyIcon>
        </div>
        <div class="music-title">
            <div class="music-title-name">{{musicStore.curPlay.name}}</div>
            <div class="music-title-authors">{{musicStore.authors}}<MyIcon icon="#icon-youjiantou" fill="rgba(255,255,255,.8)" width=".3rem"></MyIcon></div>
        </div>
        <div class="music-cd">
            <img class="needle" src="../../assets/zhen.png" :class="{ needleActive:musicStore.curPlay.flag }"/>
            <img ref="cd" class="cd" src="../../assets/cd.png" />
            <img ref="albumPic" class="album" :src="musicStore.curPlay.album.picUrl">
        </div>
        <div class="music-lyric">歌词</div>
        <div class="music-control">
            <div class="music-control-up"></div>
            <div class="music-control-middle"></div>
            <div class="music-control-down"></div>
        </div>
    </div>
</template>
<script setup>
import { useMusicStore } from '../../store/musicStore';
import MyIcon from '../../components/MyIcon.vue';
import { onMounted } from 'vue';

const musicStore = useMusicStore();

onMounted(() => {
    let dom = document.getElementById("music-container")
    dom.style.backgroundImage = `url(${musicStore.curSongList.picUrl})`
    dom.style.backgroundSize = "cover";
})


</script>
<style lang="less">
@import './vertical.less';
@import './horizontal.less';
</style>