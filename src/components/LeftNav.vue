<template>
  <div class="leftNav">
    <div class="item" v-for="item in store.pages" :key="item.key" @click="handlePageChange(item)">
      <!-- <router-link :to="{ path: item.path}"> -->
      <div class="icon-background" :style="{backgroundColor:item.activate?'red':none}">
        <svg class="icon" :style="{fill: item.activate? 'white' :'rgb(113, 115, 116)'}"
          aria-hidden="true">
          <use :xlink:href="item.icon"></use>
        </svg>
      </div>

      <div class="name" :style="{color:item.activate?'red':'rgb(113, 115, 116)'}">{{ item.name }}</div>
      <!-- </router-link> -->
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '../store'
const store = useStore();
const router = useRouter();

const handlePageChange = function (item) {
  store.changePage(item);
  router.replace({ path: item.path });
}

</script>
<style lang='less' scoped>
.leftNav {
  height: 6rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.1rem;

  .item {
    text-align: center;
    .name {
      margin-top: 0.1rem;
    }
    .icon-background {
      width: .6rem;
      height: .6rem;
      border-radius: 0.4rem;
      background-color: none;
      display: flex;
      justify-content: center;
      align-items: center;
      
      // z-index: 1;
    }
  }
}
</style>
