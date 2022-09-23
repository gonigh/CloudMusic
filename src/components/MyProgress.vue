<template>
    <div class="progress">
        <input type="range" min="0" :max="store.curPlay.duration" :value="store.curTime" @input="handleJump" step="0.05" />
    </div>
</template>
<script setup>
import { useStore } from '../store/index'

const store = useStore();

/**
 * 跳转
 * @param {*} e 
 */
const handleJump = (e)=>{
    store.playGo(e.target.value)
}

</script>
<style lang="less" scoped>
input[type=range] {
    width: 100%;
}

input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    border-radius: 10px;
    /*将轨道设为圆角的*/
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance:none;
    height: 6px;
    width: 6px;
    margin-top: -5px;
    /*使滑块超出轨道部分的偏移量相等*/
    background: red;
    border-radius: 50%;
    /*外观设置为圆形*/
}

input[type=range]:focus {
    outline: none;
}
</style>