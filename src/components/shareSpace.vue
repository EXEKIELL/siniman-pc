<template>
  <div id="shareSpace">
    <div class="wrap">
      <div v-if="shareSpaceInfo.length == 0" style="width: 100%;text-align: center;font-size: 18px;color: #333333;">暂无图片描述</div>
      <div v-else class="wrap-list" v-for="(item,index) in shareSpaceInfo" :key="index">
        <div class="list001" style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;justify-content: center;">
          <img :src='item.img' @click="click(index)" style="cursor:pointer;">
          <div class="tags01">
            <span class="ic"></span><span>{{ item.roomname }}</span>
          </div>
          <button class="del">
            <img src="../../static/img/icon20.png" alt="">
          </button>
        </div>
        <div v-if="item.description">
          <div class="xianshi clearFix" >
            <div>
              <span>创意描述：</span>
              <span>{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      :fullscreen="true"
      center>
      <el-carousel v-if="centerDialogVisible" :interval="4000" :height="h" :initial-index="cardIndex" arrow="always">
        <el-carousel-item v-for="(item,index) in shareSpaceInfo" :key="index">
          <img :src='item.img' alt="" style="width: 80%;margin: 0 auto">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </div>
</template>

<script>

    export default {
      name: "ShareSpace",
      data(){
        return {
          indexs:null,
          centerDialogVisible:false,
          cardIndex:0,
          w:'',
          h:'',
        }
      },
      props:{
        shareSpaceInfo:{
          type:Array,
          required:true
        }
      },

      methods:{
        click(index){
          this.cardIndex=index
          console.log(index)
          this.centerDialogVisible=true
        }
      },
      mounted(){
        let w=window.innerWidth
        let h=window.innerHeight
        this.w=w+'px'
        this.h=h+'px'
      },
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

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}
 .el-dialog{
   margin-top: 0 !important;
 }
</style>
