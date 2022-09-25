<template>
    <div id="footer-music" v-show="musicStore.curIndex!=-1" class="footer-music" @click="handleBottomOpen">
        <div class="footer-music-pic">
            <img :src="musicStore.curPlay.album.picUrl">
        </div>
        <div class="footer-music-control">
            <MyIcon icon="#icon-shangyishou" fill="red" width=".4rem" @click="musicStore.preSong"></MyIcon>
            <MyIcon :icon="musicStore.curPlay.flag?'#icon-zanting2':'#icon-zanting1'" fill="red" width=".7rem"
                @click="musicStore.playOrStop"></MyIcon>
            <MyIcon icon="#icon-xiayishou" fill="red" width=".4rem" @click="musicStore.nextSong"></MyIcon>
        </div>
        <div class="footer-music-middle">
            <div class="footer-music-info">
                <div>
                    <text style="font-size: .36rem;">{{musicStore.curPlay.name}}</text>
                    <text style="color: #919191;font-size: .36rem;"> - {{musicStore.authors}}</text>
                </div>
                <div>
                    <text>{{musicStore.formatCurTime}}</text>
                    <text style="color: #919191;">/{{musicStore.formatDuration}}</text>
                </div>
            </div>
            <MyProgress></MyProgress>
        </div>
        <div class="footer-music-right">
            <MyIcon icon="#icon-aixin" width=".4rem" fill="rgb(148,148,148)"></MyIcon>
            <MyIcon icon="#icon-download" width=".4rem" fill="rgb(148,148,148)"></MyIcon>
            <MyIcon :icon="musicStore.playType[musicStore.playTypeIndex]" width=".4rem" fill="rgb(148,148,148)" @click="musicStore.changePlayType"></MyIcon>
            <MyIcon icon="#icon-bofangliebiao" width=".4rem" fill="rgb(148,148,148)"></MyIcon>
        </div>

    </div>

</template>
<script setup>
import { watch } from 'vue';
import { useMusicStore } from '../store/musicStore';
import MyIcon from './MyIcon.vue';
import MyProgress from './MyProgress.vue';

const musicStore = useMusicStore();

/**
 * 初试状态隐藏，播放歌曲后弹出
 */
watch(() => musicStore.curIndex, (value) => {
    if (musicStore.curPlay.flag) {
        let dom = document.getElementsByClassName("footer-music")[0];
        dom.style.transform = "unset";
    }
})

const handleBottomOpen = (e)=>{
    if(e.target.id=="footer-music" || e.target.tagName=="IMG")
        musicStore.bottomOpen=true;
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

    .footer-music-pic {
        img {
            height: 1rem;
            width: 1rem;
        }
    }

    .footer-music-control {
        width: 4rem;
        display: flex;
        padding: 0 .8rem;
        justify-content: space-between;
        align-items: center;
    }

    .footer-music-middle {
        flex: 1;
        height: 100%;

        .footer-music-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 90%;

            text {
                font-size: .3rem;
            }
        }
    }

    .footer-music-right{
        width: 3.6rem;
        padding-left: .4rem;
        display: flex;
        justify-content: space-around;
    }
}
</style>