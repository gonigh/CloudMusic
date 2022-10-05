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
                <VanPopover v-model:show="state.showSound">
                    <template #reference>
                        <MyIcon icon="#icon-sound" width=".5rem" fill="white"></MyIcon>
                    </template>
                    <template #default>
                        <VanSlider></VanSlider>
                    </template>
                </VanPopover>


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
                <!-- <MyIcon icon="#icon-bofangliebiao" width=".5rem" fill="white"></MyIcon> -->
                <MyPopover v-model="musicStore.songListPopover" :position="pageStore.clientWidth>1000?1:8">
                    <template #reference>
                        <MyIcon icon="#icon-bofangliebiao" fill="white" width=".5rem"
                            @click="musicStore.setSongListPopover">
                        </MyIcon>
                    </template>
                    <template #default>
                        <PlayList></PlayList>
                    </template>
                </MyPopover>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useMusicStore } from '../../store/musicStore';
import MyIcon from '../../components/MyIcon.vue';
import { onMounted, reactive, ref, watch } from 'vue';
import MyProgress from '../../components/MyProgress.vue';
import MyPopover from '../../components/MyPopover.vue';
import PlayList from '../../components/PlayList.vue';
import { usePageStore } from '../../store/pageStore';

const musicStore = useMusicStore();
const pageStore = usePageStore();

const lyric = ref(null)
const state = reactive({
    requestId: 0,
    curAngle: 0,
    showSound: false,
})

/**
 * 监听是否播放，控制cd转动
 */

const cd = ref(null);
const albumPic = ref(null);

/**
 * CD转动动画
 */
const CDRotate = function () {
    state.curAngle = state.curAngle + 0.2;
    cd.value.style.transform = `rotate(${state.curAngle}deg)`
    albumPic.value.style.transform = `rotate(${state.curAngle}deg)`
    state.requestId = window.requestAnimationFrame(CDRotate);
}
onMounted(() => {
    let dom = document.getElementById("music-container")
    dom.style.backgroundImage = `url(${musicStore.curPlay.album.picUrl})`
    dom.style.backgroundSize = "cover";
    if (musicStore.curPlay.flag) {
        state.requestId = window.requestAnimationFrame(CDRotate);
    }

    if(document.documentElement.clientWidth>1000){}
})
/**
 * 监听歌曲切换
 */
watch(() => musicStore.curPlay, () => {
    let dom = document.getElementById("music-container")
    dom.style.backgroundImage = `url(${musicStore.curPlay.album.picUrl})`
    dom.style.backgroundSize = "cover";
})


/**
 * 监听是否暂停
 */
watch(() => musicStore.curPlay.flag, (value) => {
    if (value) {
        state.requestId = window.requestAnimationFrame(CDRotate);
    } else {
        window.cancelAnimationFrame(state.requestId);
    }
})

/**
 * 监听当歌词下标
 */
watch(() => musicStore.curLyricIndex, (newValue, oldValue) => {
    let curP = lyric.value.children[newValue];
    if (curP) {
        let offset = curP.offsetTop - lyric.value.offsetHeight / 2 + curP.offsetHeight / 2;
        lyric.value.scrollTo({ top: offset, behavior: 'smooth' })
    }
})

let playListPosition = ref(8)
window.onresize = function () {
    
}

</script>
<style lang="less">
@import './vertical.less';
@import './horizontal.less';
</style>