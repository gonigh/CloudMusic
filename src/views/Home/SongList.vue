<template>
    <MyCard :title="state.title">
        <template #top-right>

        </template>
        <template #default>
            <SongListCard v-for="item in state.playlist" v-bind:key="item.id" :id="'song-list-'+item.id"
                :play-count="item.playCount" :name="item.name" :pic="item.coverImgUrl">
            </SongListCard>
        </template>
    </MyCard>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import MyCard from '../../components/MyCard.vue';
import { getCatlist, getHotCatlist, getTopPlaylist } from '../../api/HomeAPI'
import SongListCard from '../../components/Home/SongListCard.vue';
import { usePageStore } from '../../store/pageStore';
const pageStore = usePageStore();

const state = reactive({
    title: "全部歌单",
});

onMounted(() => {
    getTopPlaylist().then(res => {
        state.playlist = res.data.playlists
    })
})

</script>

<style lang="less" scoped>

</style>