<template>
    <div class="playlist">
        <MyCard :title="state.title">
            <template #top-right>

            </template>
            <template #default>
                <div ref="cardContent" class="card-content" @scroll="handleScroll" @click="handleScroll">
                    <SongListCard v-for="item in state.playlist" v-bind:key="item.id" :id="'song-list-'+item.id"
                        :play-count="item.playCount" :name="item.name" :pic="item.coverImgUrl">
                    </SongListCard>
                </div>
            </template>
        </MyCard>
    </div>
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
    offset: 1,
    cat: "全部",
    playlist: [],
});
const cardContent = ref(null)

onMounted(() => {
    getTopPlaylist().then(res => {
        state.playlist = res.data.playlists
    })
})

const handleScroll = () => {
    console.log(1)
}
</script>

<style lang="less" scoped>
.card-content {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
}
</style>