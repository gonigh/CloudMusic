<template>
  <div class="container">
    <div class="left">
      <LeftNav></LeftNav>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import LeftNav from './components/LeftNav.vue';
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.container{
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
}
.left{
  width: 1.2rem;
  height: 100%;
  background-color: 'white';
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: rgb(118, 118, 118) solid .5px;
}
.content{
  flex: 1;
  // background-color: #2c3e50;
}
.icon {
  width: .4rem;
  height: .4rem;
  z-index: 10;
  // fill: aqua;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
