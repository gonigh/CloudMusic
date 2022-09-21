<template>
    <div class="song-list-detail">
        <div class="song-list-detail-top">歌 单</div>
        <div class="song-list-detail-info">
            <div class="up">
                <img :src="store.curSongList.picUrl" />
                <div class="name"></div>
            </div>
            <div class="down">
                <div v-for="item in downNums" :key="item.key">
                    <svg class="icon" :style="{fill: 'rgb(113, 115, 116)'}" aria-hidden="true">
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
import { ref, watch } from 'vue';
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
    numChange(store.curSongList)
})


</script>
<style lang="less">
.song-list-detail {
    position: relative;
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
    background-color: aliceblue;

    .up {
        img {
            width: 2rem;
            height: 2rem;
        }
    }

    .down {
        display: flex;
        justify-content: space-around;
    }
}
</style>