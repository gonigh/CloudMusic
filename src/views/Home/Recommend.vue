<template>
    <div style="margin: .2rem 0;">
        <Banner></Banner>
    </div>
    <MyCard title="推荐">
        <SongListCard v-for="item in state.showSongList" v-bind:key="item.id" :id="'song-list-'+item.id"
            :play-count="item.playCount" :name="item.name" :card-width="cardWidth" :pic="item.picUrl">
        </SongListCard>
    </MyCard>
    <div v-show="store.rightOpen">
        <MyPopup>
            <SongListDetail :id="store.curSongList.id"></SongListDetail>
        </MyPopup>
    </div>

</template>
<script setup>
import Banner from "../../components/Home/Banner.vue";
import MyCard from "../../components/MyCard.vue";
import { getRecommendSongList } from '../../api/HomeAPI'
import { ref, onMounted, reactive, watch } from "vue";
import SongListCard from "../../components/Home/SongListCard.vue";
import MyPopup from "../../components/MyPopup.vue";
import SongListDetail from "../../components/Home/SongListDetail.vue";
import { useStore } from "../../store";
const state = reactive({
    songList: [],
    showSongList: []
})
const store = useStore();

const cardWidth = ref((document.documentElement.clientWidth - 160) / 5 + "px")
const changeSongList = function () {
    let c_width = document.documentElement.clientWidth;
    if (c_width > 1000) {
        cardWidth.value = (c_width - 160) / 5 + "px";
        state.showSongList = state.songList
    } else {
        cardWidth.value = (c_width - 160) / 4 + "px";
        state.showSongList = state.songList.slice(0, 8);
    }
}
window.onresize = function () {
    changeSongList();
}
onMounted(() => {
    getRecommendSongList(10).then(res => {
        state.songList = res.data.result
        changeSongList();
    })
})

</script>
<style>

</style>