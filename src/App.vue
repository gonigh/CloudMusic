<template>
  <div class="container">
    <div class="container-left">
      <LeftNav></LeftNav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterMusic></FooterMusic>
  </div>
  <audio autoplay ref="audio" :src="musicStore.curPlay.url"></audio>
  <van-popup :show="musicStore.bottomOpen" position="bottom" style="z-index: 3001;">
    <Music></Music>
  </van-popup>

</template>
<script setup>
import LeftNav from './components/LeftNav.vue';
import { useMusicStore } from './store/musicStore';
import FooterMusic from './components/FooterMusic.vue';
import { onMounted, ref } from 'vue';
import Music from './views/Music/index.vue';
import { usePageStore } from './store/pageStore';
import throttle from './utils/throttle';

const musicStore = useMusicStore();
const pageStore = usePageStore();

const audio = ref(null);
onMounted(() => {
  musicStore.setAudio(audio);
})

// 存储当前窗口大小
pageStore.updateSize(document.documentElement.clientWidth, document.documentElement.clientHeight);

window.onresize = function () {
  pageStore.updateSize(document.documentElement.clientWidth, document.documentElement.clientHeight);
}

window.onscroll = throttle(()=>{
  pageStore.loadLazyImg();
  // console.log(window.innerHeight,window.scrollY,document.body.scrollHeight)
  // if(window.innerHeight+window.screenY>=window.outerHeight){
  //   console.log("触底")
  // }
});

</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // transition-duration: .1s;
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
}

.container-left {
  width: 1.6rem;
  height: 100%;
  position: fixed;
  background-color: 'white';
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: solid .5px rgba(118, 118, 118, 0.5);
}

.content {
  margin-left: 1.6rem;
  flex-grow: 1;
}

.icon {
  width: .4rem;
  height: .4rem;
  z-index: 10;
}

.van-popup--right {
  height: 100%;
  width: 45%;
  background-color: aqua;
}

.van-popup--bottom {
  height: 100%;
  width: 100%;
  background-color: aqua;
  z-index: 3001;
}

.van-slider__button {
  --van-slider-button-width: .16rem;
  --van-slider-button-height: .16rem;
  --van-slider-button-background-color: red;
  --van-slider-bar-heigh: .04rem;
}
</style>
