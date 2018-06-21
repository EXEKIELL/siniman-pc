<template>
    <div id="myIndent">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的订单</span>
        </div>
        <div class="w3-cont" style="flex-wrap: wrap;justify-content: initial;">
          <div class="list1" v-for="(item,index) in postData.list" :key="index" style="margin-bottom: 60px;margin-right: 48px;">
            <div class="list1-img">
              <img :src="item.product_id.desid[0].img" alt="">
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>{{item.product_id.productname}}</span><span></span><span></span></div>
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
          @current-change="change"
          :total="postData.total_page*10">
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
      methods:{
        change(val){
          //获取我的订单列表
          this.$ajax.axiosGet('/user/userinfo/orders',3,{
            page:val,
            tags:[]
          },function (res) {
            console.log(res);
            let data = res.data.data;
            that.postData = data;
          })
        }
      },
      mounted(){
        const that = this;
        // const userId = parseInt(this.$store.state.login.userId)
        // console.log(userId);
        // this.$api.axiosPost('/order/getOrderProductList'+that.$store.state.login.str1,1,{
        //   data:{
        //     userId:userId
        //   },
        //   page:{
        //     pageNum:0,
        //     pageSize:10
        //   }
        // },function (res) {
        //   console.log(res)
        //   that.postData = res.data;
        // })
        //获取我的订单列表
        this.$ajax.axiosGet('/user/userinfo/orders',3,{
          page:1,
          tags:[]
        },function (res) {
          console.log(res);
          let data = res.data.data;
          that.postData = data;
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myIndent";
</style>
