<template>
  <div class="top">
    <van-tabs :active="active">
      <template #nav-right>
        <div class="search">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
          <span>搜索</span>
        </div>
      </template>
      <van-tab title="推荐">推荐</van-tab>
      <van-tab title="歌单">歌单</van-tab>
      <van-tab title="电台">电台</van-tab>
      <van-tab title="排行榜">排行榜</van-tab>
    </van-tabs>
  </div>

</template>

<script setup>
import { ref } from 'vue';
const active = ref(0);
</script>

<style lang="less" scoped>
.top{
  --van-tabs-line-height: 0.8rem;
  --van-tab-font-size: 0.2rem;
}

.search {
  width: 30%;
  margin: 0.15rem;
  border-radius: 0.25rem;
  background-color: rgb(214, 224, 233);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #919191;
  .icon{
    margin-right: .1rem;
    width: .2rem;
    height: .2rem;
    fill: #919191;
  }
}
</style>