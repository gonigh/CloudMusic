<template>
  <div>friend</div>
  <!-- <MyPopup><p>1</p><p>2</p></MyPopup> -->
  <button @click="buttonClick">按钮</button>
</template>
  
<script setup>
import MyPopup from '../../components/MyPopup.vue';
import { useMusicStore } from '../../store/musicStore';
import { searchSong } from '../../api/HomeAPI';
const musicStore = useMusicStore()
const buttonClick = function () {
  musicStore.bottomOpen = !musicStore.bottomOpen;
}
</script>
  