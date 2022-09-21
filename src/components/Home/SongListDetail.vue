<template>
    <div class="song-list-detail">
        <div class="song-list-detail-top">歌 单</div>
        <div class="song-list-detail-info">
            <div class="background-blur"></div>
            <div class="up">
                <img :src="store.curSongList.picUrl" />
                <div class="up-right">
                    <div class="name">{{store.curSongList.name}}</div>
                    <div class="creator">
                        <img :src="store.curSongList.creator.avatar" />
                        <div class="creator-name">{{store.curSongList.creator.name}}</div>
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

        </div>
    </div>

</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useStore } from '../../store/index'
import changeCount from '../../utils/changeCount';

const props = defineProps({
    id: Number,
})
const store = useStore();

let downNums = ref([])
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
numChange(store.curSongList);
watch(() => store.curSongList.id, () => {
    let dom = document.getElementsByClassName("song-list-detail-info")[0]
    if (dom) {
        
        dom.style.backgroundImage = `url(${store.curSongList.picUrl})`
        dom.style.backgroundSize = "cover"
    }
    numChange(store.curSongList)
})

onMounted(() => {
    let dom = document.getElementsByClassName("song-list-detail-info")[0]
    dom.style.backgroundImage = `url(${store.curSongList.picUrl})`
    dom.style.backgroundSize = "cover"

})


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
    // ::before {
    //     width: 100%;
    //     height: 100%;
    //     background: inherit;
    //     backdrop-filter: blur(20px);
    //     content: "";
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    // }
    .background-blur{
        width: 100%;
        height: 100%;
        background-color: rgba(155,155,155,.3);
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
</style>