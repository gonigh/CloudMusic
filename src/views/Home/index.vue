<template>
  <div class="top">
    <van-tabs :active="pageStore.homeActive">
      <template #nav-right>
        <div class="search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
          <span>搜索</span>
        </div>
      </template>
      <template #nav-bottom>
        <div style="height: 1px;border-bottom: rgba(118, 118, 118,0.5) solid .5px;"></div>
      </template>
      <van-tab title="推荐">
        <recommend></recommend>
      </van-tab>
      <van-tab title="歌单">
        <song-list></song-list>
      </van-tab>
      <van-tab title="电台">电台</van-tab>
      <van-tab title="排行榜">排行榜</van-tab>
    </van-tabs>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { usePageStore } from '../../store/pageStore';
import Recommend from './Recommend.vue';
import SongList from './SongList.vue';

const pageStore = usePageStore();

</script>

<style lang="less" scoped>
.top {
  --van-tabs-line-height: 1.2rem;
  --van-tab-font-size: 0.3rem;
}

.search {
  width: 30%;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
  margin-right: 0.6rem;
  margin-left: 0.4rem;
  border-radius: 0.3rem;
  background-color: rgba(214, 224, 233,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #919191;

  .icon {
    margin-right: .1rem;
    width: .3rem;
    height: .3rem;
    fill: #919191;
  }
}
</style>