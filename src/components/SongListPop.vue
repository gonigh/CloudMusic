<template>
    <div class="icon-song-list">
        <MyIcon icon="#icon-bofangliebiao" width=".4rem" fill="rgb(148,148,148)" @click="musicStore.setSongListPopover">
        </MyIcon>
        <div ref="popShadow" class="pop-shadow" @click="clickPopShadow"></div>
        <div v-show="musicStore.songListPopover" ref="songList" class="song-list">
            <div class="one-song" v-for="item in musicStore.playList" :key="item.id">
                {{item.name}}
            </div>
        </div>

    </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useMusicStore } from '../store/musicStore';
import MyIcon from './MyIcon.vue';

const musicStore = useMusicStore();
const songList = ref(null)
const popShadow = ref(null)
const state = reactive({})

const clickPopShadow = (e) => {
    // if(e.target.classList.indexOf("pop-shadow")!=-1){}
    console.log(e.target)
    musicStore.songListPopover = false;
}

watch(() => musicStore.songListPopover, (value) => {
    if (value) {
        popShadow.value.style.display = "block";
    } else {
        popShadow.value.style.display = "none";
    }
})

onMounted(() => {
    popShadow.value.style.width = document.documentElement.clientWidth + "px";
    popShadow.value.style.height = document.documentElement.clientHeight + "px";
    if(musicStore.songListPopover){
        popShadow.value.style.display = "block";
    } else {
        popShadow.value.style.display = "none";
    }
})


</script>
<style lang="less" scoped>
.icon-song-list {
    position: relative;

    .song-list {
        z-index: 3001;
        color: aqua;
        width: 8rem;
        background-color: white;
        height: 10rem;
        overflow: scroll;
        position: absolute;
        bottom: .8rem;
        right: -.2rem;
        border-radius: .2rem;

        .one-song {}
    }
}

.pop-shadow {
    position: fixed;
    z-index: 3000;
    bottom: 0;
    right: 0;
}
</style>