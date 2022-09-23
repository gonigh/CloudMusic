<template>
    <div class="song-list-detail">
        <div class="song-list-detail-top">歌 单</div>
        <div class="song-list-detail-info">
            <div class="background-blur"></div>
            <div class="up">
                <img :src="musicStore.curSongList.picUrl" />
                <div class="up-right">
                    <div class="name">{{musicStore.curSongList.name}}</div>
                    <div class="creator">
                        <img :src="musicStore.curSongList.creator.avatar" />
                        <div class="creator-name">{{musicStore.curSongList.creator.name}}</div>
                        <svg class="icon" :style="{fill: 'rgb(204, 204, 204)',width:'.3rem',height:'.3rem'}"
                            aria-hidden="true">
                            <use xlink:href="#icon-youjiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="down">
                <div v-for="item in downNums" :key="item.key" style="z-index: 10;">
                    <svg class="icon" :style="{fill: 'white',width:'.6rem',height:'.6rem'}" aria-hidden="true">
                        <use :xlink:href="item.icon"></use>
                    </svg>
                    <div>{{item.num}}</div>
                </div>
            </div>
        </div>
        <div class="song-list-detail-content">
            <div class="play-all">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang"></use>
                </svg>
                <div style="margin: 0 .2rem;">播放全部</div>
                <div class="song-count">
                    (共{{musicStore.curSongList.songCount}}首)
                </div>
            </div>
            <OneSong v-for="(item,i) in musicStore.curSongList.songList" :key="item.id" 
                :song="item" @click="handlePlaySong(item)">
                <template #left>
                    <div class="song-list-index">{{i+1}}</div>
                </template>
            </OneSong>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMusicStore } from '../../store/musicStore'
import changeCount from '../../utils/changeCount';
import OneSong from './oneSong.vue';

const props = defineProps({
    id: Number,
})
const musicStore = useMusicStore();

let downNums = ref([])

/**
 * 转换收藏量、评论数、分享数数据，并且每次打开新歌单重新运行
 * @param {*} cur 
 */
const numChange = (cur) => {

    downNums.value = []
    const state = cur
    let num1 = changeCount(state.subscribedCount);
    let num2 = changeCount(state.commentCount);
    let num3 = changeCount(state.shareCount);
    let num4 = "下载";
    let icon1 = "#icon-shoucang";
    let icon2 = "#icon-xiaoxi";
    let icon3 = "#icon-fenxiang";
    let icon4 = "#icon-download";
    downNums.value.push({ key: 1, icon: icon1, num: num1 });
    downNums.value.push({ key: 2, icon: icon2, num: num2 });
    downNums.value.push({ key: 3, icon: icon3, num: num3 });
    downNums.value.push({ key: 4, icon: icon4, num: num4 });
}
numChange(musicStore.curSongList);

/**
 * 监听当前歌单，一旦歌单歌单切换数据重新获取
 */
watch(() => musicStore.curSongList.id, () => {
    let dom = document.getElementsByClassName("song-list-detail-info")[0]
    if (dom) {

        dom.style.backgroundImage = `url(${musicStore.curSongList.picUrl})`
        dom.style.backgroundSize = "cover"
    }
    numChange(musicStore.curSongList)
})

/**
 * 根据歌单封面渲染背景图
 */
onMounted(() => {
    let dom = document.getElementsByClassName("song-list-detail-info")[0]
    dom.style.backgroundImage = `url(${musicStore.curSongList.picUrl})`
    dom.style.backgroundSize = "cover"
})

const handlePlaySong = (item)=>{
    musicStore.playSong(item)
}

</script>
<style lang="less">
.song-list-detail {
    position: relative;
    z-index: 10;
}

.song-list-detail-top {
    width: 2rem;
    padding: .3rem;
    font-size: .4rem;
    position: fixed;
    top: 0;
    left: 50%;
    margin-left: -1rem;
}

.song-list-detail-info {
    padding: .5rem;
    margin-top: 1rem;
    backdrop-filter: blur(20px);

    .background-blur {
        width: 100%;
        height: 100%;
        background-color: rgba(155, 155, 155, .3);
        backdrop-filter: blur(60px);
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }

    .up {
        display: flex;
        // color: white;
        font-size: .4rem;

        .up-right {
            padding: .4rem;
            z-index: 10;

            .name {
                margin-left: .2rem;
                color: white;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .creator {
                margin-top: .5rem;
                display: flex;
                align-items: center;
                color: rgb(204, 204, 204);
                z-index: 10;

                .creator-name {
                    font-size: .3rem;
                    margin: 0 .1rem;
                }

                img {
                    width: .6rem;
                    height: .6rem;
                    border-radius: .3rem;
                }
            }
        }

        img {
            width: 2.8rem;
            height: 2.8rem;
            z-index: 10;
        }
    }

    .down {
        color: white;
        margin-top: .4rem;
        display: flex;
        justify-content: space-around;
    }
}

.song-list-detail-content {
    padding: .2rem;
    margin-bottom: 2rem;
    .play-all {
        margin: .2rem;
        font-size: .4rem;
        display: flex;
        align-items: center;

        .song-count {
            line-height: 100%;
            font-size: .8em;
            color: rgb(164, 164, 164);
        }
    }
    .song-list-index{
        height: 100%;
        width: 100%;
        margin: auto;
        line-height: 100%;
        text-align: center;
        font-size: .3rem;
        color: rgb(164, 164, 164);
    }
}
</style>