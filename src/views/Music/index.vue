<template>
    <div class="music">
        <div class="back">
            <MyIcon icon="#icon-xiajiantou" fill="rgb(248,248,248)" width=".4rem" @click="musicStore.bottomOpen=false">
            </MyIcon>
        </div>
        <div class="music-title">
            <div class="music-title-name">{{musicStore.curPlay.name}}</div>
            <div class="music-title-authors">{{musicStore.authors}}<MyIcon icon="#icon-youjiantou" fill="rgba(255,255,255,.8)" width=".3rem"></MyIcon></div>
        </div>
        <div class="music-cd">
            <img class="needle" src="../../assets/zhen.png" />
            <img class="cd" src="../../assets/cd.png" />
            <img class="album" :src="musicStore.curPlay.album.picUrl">
        </div>
        <div class="music-lyric">歌词</div>
        <div class="music-control">控件</div>
    </div>
</template>
<script setup>
import { useMusicStore } from '../../store/musicStore';
import MyIcon from '../../components/MyIcon.vue';


const musicStore = useMusicStore();

const handleBottomClose = (e) => {
    musicStore.bottomOpen = false;
}

</script>
<style lang="less">
@import './vertical.less';
@import './horizontal.less';
</style>