<template>
    <div id="projectSpace">
      <div class="wrap">
        <div v-if="projectSpace.length == 0" style="width: 100%;text-align: center;font-size: 18px;color: #333333;">暂无详情</div>
        <div v-else class="wrap-list" v-for="(item,index) in projectSpace" :key="index">
          <div>
            <img :src="item.img" @click="click(index)" style="cursor:pointer;">
            <button class="del" style="display: none">
              <img src="../../static/img/icon20.png" alt="">
            </button>
          </div>
          <div>
            <div class="bianji clearFix" v-if="item.ok==1">
              <div>
                <span>创意描述：</span><input class="write" type="text" v-model="item.description">
              </div>
              <button @click="bz(index)">保存</button>
            </div>
            <div class="xianshi clearFix" v-else>
              <div>
                <span>创意描述：</span><span>{{ item.description?item.description:"您暂未对该效果图进行创意描述，增加描述可提高被下载几率，获得更多积分哦~" }}</span>
              </div>
              <button @click="xian(index)">编辑描述</button>
            </div>

          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="centerDialogVisible"
        :fullscreen="true"
        center>
        <el-carousel v-if="centerDialogVisible" :interval="4000" :height="h" :initial-index="cardIndex" arrow="always">
          <el-carousel-item v-for="(item,index) in projectSpace" :key="index" >
            <img :src='item.img' alt="" style="width: 80%;margin: 0 auto">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "ProjectSpace",
      data(){
        return {
          indexs:null,
          ok:0,
          projectSpaceList:[],
          centerDialogVisible:false,
          cardIndex:0,
          w:'',
          h:'',
        }
      },
      props:["projectSpace"],
      methods:{
        xian(index){
            this.$forceUpdate();
            this.projectSpace[index].ok=1
        },
        bz(index){
          let that=this
          let data=this.projectSpace[index]
          that.$api.axiosPost('/render/updateDesc',1,data,function(){
            that.projectSpace[index].ok=0
            that.$forceUpdate();
          })
        },
        click(index){
          this.cardIndex=index
          this.centerDialogVisible=true
        }
      },

      mounted(){
        let h=window.innerHeight
        this.h=h+'px'
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/projectSpace";
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
.el-carousel__indicators{
  display: none;
}
.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}
</style>
