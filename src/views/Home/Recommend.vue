<template>
    <div style="margin: .5rem 0;">
        <Banner></Banner>
    </div>
    <MyCard title="推荐">
        <SongListCard v-for="item in state.songList" v-bind:key="item.id" 
        :id="'song-list-'+item.id"
            :play-count="item.playCount" :name="item.name" 
            :card-width="cardWidth" :pic="item.picUrl">
        </SongListCard>
    </MyCard>
</template>
<script setup>
import Banner from "../../components/Home/Banner.vue";
import MyCard from "../../components/MyCard.vue";
import { getRecommendSongList } from '../../api/HomeAPI'
import { computed, onMounted, reactive } from "vue";
import SongListCard from "../../components/Home/SongListCard.vue";
const state = reactive({
    songList: []
})

const cardWidth = computed(() => {
    let c_width = document.documentElement.clientWidth;
    if (c_width > 1000) {
        return (c_width - 200) / 5 + "px";
    } else {
        return (c_width - 200) / 4 + "px";
    }


})
onMounted(() => {
    getRecommendSongList(10).then(res => {
        console.log(res)
        state.songList = res.data.result
    })
})

</script>
<style>

</style>