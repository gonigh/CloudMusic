<template>
  <div :v-show="show">friend</div>
  <MyPopup><p>1</p><p>2</p></MyPopup>
  <button @click="buttonClick">按钮</button>
</template>
  
<script setup>
import MyPopup from '../../components/MyPopup.vue';
import { useStore } from '../../store';
let show = true
const store = useStore()
const buttonClick = function () {
  store.openSongList();
}
</script>
  