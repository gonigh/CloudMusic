<template>
    <div class="song-list">
        <div class="song-list-top">
            <div class="song-list-top-left" @click="musicStore.changePlayType">
                <MyIcon :icon="musicStore.playType[musicStore.playTypeIndex].icon" width=".4rem"
                    fill="rgb(148,148,148)"></MyIcon>
                <span style="margin-left: .2rem;">{{musicStore.playType[musicStore.playTypeIndex].name}}</span>
            </div>
            <div class="song-list-top-middle">
                <MyIcon icon="#icon-shoucang" width=".4rem" fill="rgb(148,148,148)"></MyIcon>
                <span style="margin-left: .2rem;">收藏</span>
            </div>
            <div class="song-list-top-right">
                <MyIcon icon="#icon-shanchu" width=".4rem" fill="rgb(148,148,148)" @click="musicStore.clearPlayList">
                </MyIcon>
            </div>
        </div>
        <div class="songs">
            <div class="one-song" v-for="(item) in musicStore.playList" :key="item.id">
                <div v-show="item.id==musicStore.curId">
                    <MyIcon icon="#icon-sound" width=".4rem" fill="red"></MyIcon>
                </div>
                <div class="one-song-left" @click="handleSelectSong(item.id)">
                    <span
                        :style="{color:item.id==musicStore.curId?'red':'black',fontSize:'.3rem',margin: '0 .1rem'}">{{item.name}}</span>
                    <span
                        :style="{color:item.id==musicStore.curId?'red':'rgba(0,0,0,.7)',fontSize:'.2rem'}">{{"-"+item.authors.map((i)=>
                        i.name).join("/")}}</span>
                </div>
                <div class="one-song-right">
                    <MyIcon icon="#icon-cuowu" width=".3rem" fill="rgb(148,148,148)"
                        @click="musicStore.removeSong(item.id)"></MyIcon>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useMusicStore } from '../store/musicStore';
import MyIcon from './MyIcon.vue';

const musicStore = useMusicStore();

const props = defineProps({
    width: String,
    fill: String
})


/**
 * 选择播放歌曲
 * @param {*} id 
 */
const handleSelectSong = (id) => {
    let nextSong = musicStore.playList.filter((item) => {
        return item.id == id
    })[0];
    console.log(nextSong)
    musicStore.playSong(nextSong, 2);
}


</script>
<style lang="less" scoped>
.song-list {
    width: 8rem;
    background-color: white;
    height: 10rem;
    border-radius: .2rem;
    padding-top: 1rem;
    overflow: hidden;

    .song-list-top {
        font-size: .36rem;
        margin-top: -1rem;
        height: .8rem;
        width: 100%;
        display: flex;
        padding: .1rem .2rem;

        .song-list-top-left {
            display: flex;
            align-items: center;
            height: 100%;
            line-height: 100%;
            flex: 1;
        }

        .song-list-top-middle {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            line-height: 100%;
            width: 2rem;
        }

        .song-list-top-right {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            line-height: 100%;
            width: 1rem;
            border-left: 1px solid rgba(0, 0, 0, .1);
        }
    }

    .songs {
        overflow: scroll;
        height: 100%;

        .one-song {
            height: .8rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgba(0, 0, 0, .1);
            padding: .1rem .2rem;

            .one-song-left {
                flex: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }

            .one-song-right {
                width: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}
</style>