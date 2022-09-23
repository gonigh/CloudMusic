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
  <audio autoplay ref="audio" :src="store.curPlay.url"></audio>
  
</template>
<script setup>
import LeftNav from './components/LeftNav.vue';
import { useStore } from './store';
import FooterMusic from './components/FooterMusic.vue';
import { onMounted, ref } from 'vue';
const store = useStore();

const audio = ref(null);
onMounted(()=>{
  store.setAudio(audio);
})


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

</style>
