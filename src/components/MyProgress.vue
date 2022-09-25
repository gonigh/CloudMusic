<template>
    <div class="progress">
        <van-slider active-color="red" :max="musicStore.curPlay.duration" v-model="musicStore.curTime" @change="handleJump">
        </van-slider>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useMusicStore } from '../store/musicStore'

const musicStore = useMusicStore();

/**
 * 跳转
 * @param {*} e 
 */
const handleJump = (e)=>{
    musicStore.playGo(e)
}

</script>
<style lang="less" scoped>
.progress{
    margin: 0.1rem;
    width: 100%;
}
</style>