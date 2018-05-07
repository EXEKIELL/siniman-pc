<template>
  <div id="app" class="clearFix" v-if="show">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      show:true,
      userId:'',
      token:''
    }
  },
  mounted(){
    this.show = true
  }
}
</script>

<style lang="scss" scoped>
@import "../static/sass/App";
</style>
<style lang="scss">
@import "../static/sass/public";
</style>
