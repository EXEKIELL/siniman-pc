<template>
    <div id="projectSpace">
      <div class="wrap">
        <div v-if="projectSpace.length == 0" style="width: 100%;text-align: center;font-size: 18px;color: #333333;">暂无详情</div>
        <div v-else class="wrap-list" v-for="(item,index) in projectSpace" :key="index">
          <div>
            <img :src=item.img>
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
                <span>创意描述：</span><span>{{ item.description?item.description:"您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~" }}</span>
              </div>
              <button @click="xian(index)">编辑描述</button>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "ProjectSpace",
      data(){
        return {
          indexs:null,
          ok:0,
          projectSpaceList:[]
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
        }
      },

      mounted(){

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/projectSpace";
</style>
