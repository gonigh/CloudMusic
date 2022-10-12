<template>
    <div style="margin: .2rem 0;">
        <Banner></Banner>
    </div>
    <MyCard title="推荐">
        <template #top-right>
            <div @click="pageStore.updateHomeActive('playlist')">
                <text>更多</text>
                <MyIcon icon="#icon-youjiantou" width=".25rem"></MyIcon>
            </div>
        </template>
        <div class="card-content">
            <SongListCard v-for="item in showSongList" v-bind:key="item.id" :id="'song-list-'+item.id"
                :play-count="item.playCount" :name="item.name" :card-width="state.cardWidth" :pic="item.picUrl">
            </SongListCard>
        </div>
    </MyCard>
    <div v-show="pageStore.rightOpen">
        <MyPopup>
            <SongListDetail :id="musicStore.curSongList.id"></SongListDetail>
        </MyPopup>
    </div>

</template>
<script setup>
import Banner from "../../components/Home/Banner.vue";
import MyCard from "../../components/MyCard.vue";
import { getRecommendSongList } from '../../api/HomeAPI'
import { ref, onMounted, reactive, watch, computed } from "vue";
import SongListCard from "../../components/Home/SongListCard.vue";
import MyPopup from "../../components/MyPopup.vue";
import SongListDetail from "../../components/Home/SongListDetail.vue";
import { useMusicStore } from "../../store/musicStore";
import { usePageStore } from "../../store/pageStore";
import MyIcon from "../../components/MyIcon.vue";

const musicStore = useMusicStore();
const pageStore = usePageStore();

const state = reactive({
    songList: [],
})
const showSongList = computed(()=>{
    return pageStore.clientWidth>100 ? state.songList : state.songList.slice(0, 8);
})


onMounted(() => {
    getRecommendSongList(10).then(res => {
        state.songList = res.data.result;
    })

})

</script>
<style lang="less" scoped>
.card-content {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>