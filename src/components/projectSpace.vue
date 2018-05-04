<template>
    <div id="projectSpace">
      <div class="wrap">
        <div class="wrap-list" v-for="(item,index) in projectSpace" :key="index">
          <div>
            <img :src=item.img>
            <button class="del">
              <img src="../../static/img/icon20.png" alt="">
            </button>
          </div>
          <div>
            <div class="xianshi clearFix" v-if="ok">
              <div>
                <span>创意描述：</span><span>{{}}</span>
              </div>
              <button @click="xian(item)">编辑描述</button>
            </div>
            <div class="bianji clearFix" v-else>
              <div>
                <span>创意描述：</span><input class="write" type="text" v-model="item.miaoshu">
              </div>
              <button @click="bz(item)">保存</button>
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
          ok:true,
          projectSpaceList:[
            {
              imgsrc:"../../static/img/img09.png",
              miaoshu:"您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~",
              ok:true
            },
            {
              imgsrc:"../../static/img/img09.png",
              miaoshu:"您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~",
              ok:true
            },
            {
              imgsrc:"../../static/img/img09.png",
              miaoshu:"您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~",
              ok:true
            },
            {
              imgsrc:"../../static/img/img09.png",
              miaoshu:"您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~",
              ok:true
            }
          ]
        }
      },
      props:{
        projectSpace:{
          type:Array,
          required:true
        }
      },
      methods:{
        xian(item){
          this.ok = false;
          // item.miaoshu = ''
        },
        bz(item){
          this.ok = true;
          // if(item.miaoshu == ''){
          //   item.miaoshu = '您暂未对该效果图进行创意描述，增加描述可提高被购买率哦~'
          // }
        }
      },
      mounted(){

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/projectSpace";
</style>
