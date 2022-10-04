<template>
    <van-popup id="right-zoom" :show="musicStore.rightOpen" position="right" :overlay=false :lock-scroll=false
        teleport="div.container" @opened="openRight" >

        <slot></slot>
    </van-popup>
</template>
<script setup>
import { useMusicStore } from '../store/musicStore';
import throttle from '../utils/throttle'
const state = {};
const musicStore = useMusicStore();

const openRight = function () {
    state.dom = document.getElementById("right-zoom");
    state.dom.style.transform = "translate(0,-50%)";
    state.dom.style.boxShadow = "-1px 0 10px rgba(18,18,18,.2)";

    state.dom.addEventListener("touchstart",rightTouchStart,true);
    state.dom.addEventListener("touchmove",handleMove,true);
    state.dom.addEventListener("touchend",rightTouchEnd,true);
}
/**
 * 触摸开始
 * @param {*} e
 */
const rightTouchStart = (e) => {
    // if(e.target != state.dom) return;
    state.rightStart = e.touches[0].pageX;
}

/**
 * 触摸移动过程
 */
const handleMove = throttle((e) => {
    // if(e.target != state.dom) return;
    let rightDom = state.dom;
    let moveDis = e.touches[0].pageX - state.rightStart;
    if (moveDis < 0) moveDis = 0;
    rightDom.style.transform = `translate(${moveDis}px,-50%)`
})

/**
 * 触摸结束
 * @param {*} e 
 */
const rightTouchEnd = (e) => {
    // if(e.target != state.dom) return;
    let totalWidth = document.documentElement.clientWidth;
    let contentWidth = totalWidth*0.45;
    let threshold = contentWidth/2;
    let dis = e.changedTouches[0].pageX - state.rightStart;
    if(dis > threshold) {
        state.dom.style.transform=`translate(${contentWidth}px,-50%)`
        musicStore.closeSongList()
        
    }else{
        state.dom.style.transform = "translate(0,-50%)"
    }
}



</script>
<style lang="less" scoped>

</style>