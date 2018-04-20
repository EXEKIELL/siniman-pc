<template>
  <div id="shareSpace">
    <div class="wrap">
      <div class="wrap-list" v-for="(item,index) in projectSpaceList" :key="index">
        <div>
          <img :src=item.imgsrc>
          <button class="del">
            <img src="../../static/img/icon20.png" alt="">
          </button>
        </div>
        <div>
          <div class="xianshi clearFix" v-if="item.ok">
            <div>
              <span>创意描述：</span><span>{{item.miaoshu}}</span>
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
          projectSpaceList:[
            {
              imgsrc:"../../static/img/img09.png",
              miaoshu:"楼层一楼，所以做了落地式玻璃，享尽四季风景，不用再羡慕别人有诗和远方",
              ok:true
            },
            {
              imgsrc:"../../static/img/img10.png",
              miaoshu:"楼层一楼，所以做了落地式玻璃，享尽四季风景，不用再羡慕别人有诗和远方",
              ok:true
            },
            {
              imgsrc:"../../static/img/img11.png",
              miaoshu:"楼层一楼，所以做了落地式玻璃，享尽四季风景，不用再羡慕别人有诗和远方",
              ok:true
            },
            {
              imgsrc:"../../static/img/img12.png",
              miaoshu:"楼层一楼，所以做了落地式玻璃，享尽四季风景，不用再羡慕别人有诗和远方",
              ok:true
            }
          ]
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareSpace";
</style>
