<template>
    <div class="icon-song-list">
        <MyIcon icon="#icon-bofangliebiao" width=".4rem" fill="rgb(148,148,148)" @click="musicStore.setSongListPopover">
        </MyIcon>
        <div v-show="musicStore.songListPopover" ref="songList" class="song-list">
            <div class="pop-shadow"></div>
            <div v-for="item in musicStore.playList" :key="item.id">
                {{item.name}}
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, watch } from 'vue';
import { useMusicStore } from '../store/musicStore';
import MyIcon from './MyIcon.vue';

const musicStore = useMusicStore();
const songList = ref(null)
const state = reactive({})

watch(()=>musicStore.songListPopover,(value)=>{
    if(value){
        let dom = document.createElement('div');
        dom.classList.add(".pop-shadow");
        state.dom = dom;
        let body = document.getElemen
        body.appendChild(dom);
    }else{
        let body = document.getElementsByName("body")[0];
        body.removeChild(state.dom);
    }
})


</script>
<style lang="less" scoped>
.icon-song-list {
    position: relative;

    .pop-shadow {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
    }

    .song-list {
        z-index: 1000;
        color: aqua;
        width: 8rem;
        background-color: white;
        height: 10rem;
        overflow: scroll;
        z-index: 100;
        position: absolute;
        bottom: .8rem;
        right: -.2rem;
        border-radius: .2rem;

        .one-song {}
    }
}
</style>