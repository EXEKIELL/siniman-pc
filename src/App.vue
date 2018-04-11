<template>
  <div id="app" class="clearFix">
    <div class="left">
      <img src="" alt="">
      <ul>
        <li v-for="(item,index) in navTabs" :key="item.key">

        </li>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      navTabs: [
        {text:"分享社区",key:0},
        {text:"分享社区",key:1},
        {text:"分享社区",key:2},
        {text:"分享社区",key:3},
        {text:"分享社区",key:4},
        {text:"分享社区",key:5},
      ]
    }
  }
}
</script>

<style>
.clearFix::after{
  content: '';
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.clearFix{
  zoom: 1;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
}
#app>div{
  float: left;
}
  .left{
    width: 10%;

  }
  .right{
    width: 90%;
  }
</style>
