<template>
    <div :id="props.id" class="song-list" @click="handleOpenSongList">
        <img src="../../assets/music.png" :data-src="props.pic" />
        <div class="song-list-play-count">
            <svg class="icon" style="height:10px" aria-hidden="true">
                <use xlink:href="#icon-24gf-headphones"></use>
            </svg>
            <text>{{state.playCount}}</text>
        </div>
        <div class="song-list-name">{{props.name}}</div>
    </div>
</template>
<script setup>
import { onMounted, reactive, watch } from 'vue';
import { useMusicStore } from '../../store/musicStore';
import { usePageStore } from '../../store/pageStore';
import changeCount from '../../utils/changeCount'

const musicStore = useMusicStore();
const pageStore = usePageStore();
const props = defineProps({
    name: String,
    pic: String,
    playCount: Number,
    id: String,
})
const state = reactive({
    playCount: changeCount(props.playCount),
    pic: '../../assets/music.png',
})

/**
 * 设置歌单宽度
 */
onMounted(() => {
    let dom = document.getElementById(props.id);
    let parentWidth = dom.parentElement.offsetWidth;
    let width = parentWidth > 1000 ? parentWidth / 5 :parentWidth / 4;
    let img = dom.children[0];
    let name = dom.children[2];
    dom.style.height = `${width * 1.25}px`;
    img.style.width = `${width-10}px`;
    name.style.width = `${width-10}px`;
    if (img.getBoundingClientRect().top < pageStore.clientHeight * 1.5) {
        img.src = props.pic;
    } else {
        pageStore.addLazyImg({ dom: img, url: props.pic });
    }
})
/**
 * 监听宽度变化，窗口宽度改变后歌单宽度随之改变
 */
watch(() => pageStore.clientWidth, (newValue, oldValue) => {
    let dom = document.getElementById(props.id);
    let width = dom.parentElement.offsetWidth > 1000 ? dom.parentElement.offsetWidth / 5 : dom.parentElement.offsetWidth / 4;
    let img = dom.children[0];
    let name = dom.children[2];
    dom.style.height = `${width * 1.25}px`;
    img.style.width = `${width-10}px`;
    name.style.width = `${width-10}px`;
})

const handleOpenSongList = function () {
    musicStore.openSongList(parseInt(props.id.slice(10)));
}
</script>
<style lang="less" scoped>
.song-list {
    padding: 5px;
    position: relative;
    overflow: hidden;

    .song-list-play-count {
        position: absolute;
        top: .1rem;
        right: .1rem;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(200, 200, 200, .5));

        text {
            color: white;
            text-align: center;
        }
    }

    .song-list-name {
        font-size: 1.5em;
    }

}
</style>