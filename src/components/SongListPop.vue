<template>
    <div class="icon-song-list">
        <MyIcon icon="#icon-bofangliebiao" width=".4rem" fill="rgb(148,148,148)" @click="musicStore.setSongListPopover">
        </MyIcon>
        <div v-show="musicStore.songListPopover" ref="songList" class="song-list">
            <div class="one-song" v-for="item in musicStore.playList" :key="item.id">
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

const clickPopShadow = (e)=>{
    // if(e.target.classList.indexOf("pop-shadow")!=-1){}
    console.log(e.target)
    musicStore.songListPopover = false;
}

watch(()=>musicStore.songListPopover,(value)=>{
    if(value){
        let dom = document.createElement('div');
        dom.classList.add("pop-shadow");
        dom.addEventListener("click",clickPopShadow,true);
        state.dom = dom;
        let container = document.getElementsByClassName("container")[0];
        container.appendChild(dom);
    }else{
        let container = document.getElementsByClassName("container")[0];
        container.removeChild(state.dom);
    }
})


</script>
<style lang="less" scoped>
.icon-song-list {
    position: relative;

    .song-list {
        z-index: 4001;
        color: aqua;
        width: 8rem;
        background-color: white;
        height: 10rem;
        overflow: scroll;
        position: absolute;
        bottom: .8rem;
        right: -.2rem;
        border-radius: .2rem;

        .one-song {
        }
    }
}
</style>