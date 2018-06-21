<template>
  <div id="myCollect">
    <div class="wrap3">
      <div class="w3-title">
        <span>我的收藏</span>
      </div>
      <div class="w3-cont">
        <div class="list1" v-for="(item,index) in getList.list" :key="index">
          <div class="list1-img" style="height: 347.16px;display: flex;align-items: center">
            <img :src="item.product_id.desid[0].img" alt="">
            <!--<div>-->
              <!--<button>分享家·赢豪礼</button>-->
              <!--<button>编辑方案</button>-->
            <!--</div>-->
            <!--<div>-->
              <!--<div>-->
                <!--<img src="../../static/img/img_sm01.png" alt="">-->
                <!--<div class="maskSm">-->
                  <!--<button>设为封面</button>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div>-->
                <!--<img src="../../static/img/img_sm02.png" alt="">-->
                <!--<div class="maskSm">-->
                  <!--<button>设为封面</button>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div>-->
                <!--<img src="../../static/img/img_sm03.png" alt="">-->
                <!--<div class="maskSm">-->
                  <!--<button>设为封面</button>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div>-->
                <!--<img src="../../static/img/img_sm04.png" alt="">-->
                <!--<div class="maskSm">-->
                  <!--<button>设为封面</button>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>{{item.product_id.productname}}</span><span>{{item.product_id.housetype}}</span><span>{{item.product_id.area}}m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>{{item.product_id.customername}}</span>
              </div>
              <div>
                <span></span><span>{{item.product_id.customercontact}}</span>
              </div>
              <div>
                <span></span><span>{{item.product_id.customeraddr}}</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span v-for="(item1,index1) in item.product_id.tags" :key="index1" v-if="index1<4">{{item1.tagname}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="getList.total_page*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MyCollect",
      data(){
        return{
          getList:[]
        }
      },
      mounted(){
        const that = this;
        console.log(123);
        this.$ajax.axiosGet('/user/userinfo/favorites',3,{
          page:1
        },function (res) {
          console.log(res);
          if(res.data.status == 200){
            that.getList = res.data.data;
            console.log(that.getList)
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myCollect";
</style>
