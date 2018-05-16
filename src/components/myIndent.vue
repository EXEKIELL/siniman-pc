<template>
    <div id="myIndent">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的订单</span>
        </div>
        <div class="w3-cont">
          <div class="list1" v-for="(item,index) in postData.list" :key="index">
            <div class="list1-img">
              <img :src="item.img" alt="">
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>{{item.product.productname}}</span><span>{{item.product.housetype}}</span><span>{{item.product.area}}m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>{{item.customername}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customercontract}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customeraddress}}</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span v-for="(item1,index1) in item.product.producttag" :key="index1">{{item1.tagname}}</span>
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
          :total="postData.pages*10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyIndent",
      data(){
        return {
          postData:[]
        }
      },
      mounted(){
        const that = this;
        const userId = parseInt(this.$store.state.login.userId)
        console.log(userId);
        this.$api.axiosPost('/order/getOrderProductList'+that.$store.state.login.str1,1,{
          data:{
            userId:userId
          },
          page:{
            pageNum:0,
            pageSize:10
          }
        },function (res) {
          console.log(res)
          that.postData = res.data;
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myIndent";
</style>
