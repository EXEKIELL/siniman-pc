<template>
  <div id="shareSpace">
    <div class="wrap">
      <div class="wrap-list" v-for="(item,index) in shareSpaceInfo" :key="index">
        <div style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;">
          <img :src='item.img' @click="click">
          <button class="del">
            <img src="../../static/img/icon20.png" alt="">
          </button>
        </div>
        <div>
          <div class="xianshi clearFix" >
            <div>
              <span>创意描述：</span><span>{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareSpace",
      data(){
        return {
          indexs:null,
        }
      },
      props:{
        shareSpaceInfo:{
          type:Array,
          required:true
        }
      },
      methods:{
        click(){
          console.log(this.shareSpaceInfo)
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareSpace";
</style>
