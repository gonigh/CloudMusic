<template>
    <MyCard :title="state.title">
        <template #top-right>

        </template>
        <template #default>
            <div style="display: flex;flex-wrap: wrap;justify-content: space-between;overflow: scroll;" ref="allSongList" @scroll="handleScroll">
                <SongListCard v-for="item in state.playlist" v-bind:key="item.id" :id="'song-list-'+item.id"
                    :play-count="item.playCount" :name="item.name" :card-width="state.cardWidth"
                    :pic="item.coverImgUrl">
                </SongListCard>
            </div>

        </template>
    </MyCard>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import MyCard from '../../components/MyCard.vue';
import { getCatlist, getHotCatlist, getTopPlaylist } from '../../api/HomeAPI'
import SongListCard from '../../components/Home/SongListCard.vue';
import { usePageStore } from '../../store/pageStore';
import throttle from '../../utils/throttle';
const pageStore = usePageStore();

const state = reactive({
    title: "全部歌单",
    cardWidth: pageStore.clientWidth>1000?(pageStore.clientWidth - 160) / 5 + "px":(pageStore.clientWidth - 160) / 4 + "px",
});

watch(() => pageStore.clientWidth, () => {
    let c_width = pageStore.clientWidth
    if (c_width > 1000) {
        state.cardWidth = (c_width - 160) / 5 + "px";
    } else {
        state.cardWidth = (c_width - 160) / 4 + "px";
    }
})
const allSongList = ref(null);

const handleScroll = (e)=>{
    console.log(1)
}

onMounted(() => {
    getTopPlaylist().then(res => {
        state.playlist = res.data.playlists
    })
    pageStore.loadLazyImg(state.pageName);
    allSongList.value.addEventListener('scroll',()=>{console.log(1)});
})

</script>

<style lang="less" scoped>

</style>