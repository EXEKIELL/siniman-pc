<template>
  <div id="shareSpace">
    <div class="wrap">
      <div v-if="shareSpaceInfo.length == 0" style="width: 100%;text-align: center;font-size: 18px;color: #333333;">暂无图片描述</div>
      <div v-else class="wrap-list" v-for="(item,index) in shareSpaceInfo" :key="index">
        <div class="list001" style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;justify-content: center;">
          <img :src='item.img' @click="click">
          <div class="tags01">
            <span class="ic"></span><span>{{ item.roomname }}</span>
          </div>
          <button class="del">
            <img src="../../static/img/icon20.png" alt="">
          </button>
        </div>
        <div>
          <div class="xianshi clearFix" >
            <div>
              <span>创意描述：</span>
              <span v-if="item.description">{{item.description}}</span>
              <span v-else>设计师暂未对该效果图进行创意描述</span>
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
.tags01{
  position: absolute;
  padding: 10px 30px;
  background: rgba(0,0,0,0.5);
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  z-index: -1;
  opacity: 0;
}
.ic{
  width: 11px;
  height: 16px;
  background: url("../../static/img/icon/icon2333.png") no-repeat center;
  background-size: 100% auto;
  margin-right: 5px;
}
  .list001:hover .tags01{
    z-index: 100;
    opacity: 1;
  }
</style>
