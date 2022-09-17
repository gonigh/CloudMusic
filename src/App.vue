<template>
  <div class="container">
    <div class="container-left">
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
.container-left{
  width: 1.6rem;
  height: 100%;
  position: fixed;
  background-color: 'white';
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: rgba(118, 118, 118,0.5) solid .5px;
}
.content{
  margin-left: 1.6rem;
  flex-grow: 1;
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
