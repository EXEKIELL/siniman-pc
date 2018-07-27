<template>
  <div id="myCollect">
    <div class="wrap3">
      <div class="w3-title">
        <span>我的收藏</span>
      </div>
      <div class="w3-cont">
        <div class="list1" v-for="(item,index) in getList.list" :key="index" @click="prodesc(item.productId)">
          <div class="list1-img">
            <img :src="item.product.simg" :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix">
              <span>{{item.product.productname}}</span>
              <span>{{item.product.housetype}}</span>
              <span>{{item.product.area}}m²</span>
            </div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>{{item.product.customername}}</span>
              </div>
              <div>
                <span></span><span>{{item.product.customercontact}}</span>
              </div>
              <div>
                <span></span><span>{{item.product.customeraddr}}</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span v-for="(item1,index1) in item.protagList" :key="index1" v-if="index1<4">
              <template v-if="item1">
                     {{item1.tagname}}
              </template>

            </span>
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
        @current-change="change"
        :total="getList.last_page*10">
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
      methods:{
        change(val){
          let that=this
          //获取我的订单列表
          this.$api.axiosPost('/procollect/getlist',1,{
            data:{
            },
            page:{
              pageNum:val,
              pageSize:10
            }
          },function (res) {
            that.getList = res.data.data;
          })
        },
        prodesc(id){
          this.$router.push({path:'/indexWrap/shareProject',query:{productId:id}})
        }
      },
      mounted(){
        this.change(1)
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myCollect";
</style>
