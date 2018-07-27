<template>
    <div id="myIndent">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的订单</span>
        </div>
        <div class="w3-cont" v-loading.body="listLoading" style="flex-wrap: wrap;justify-content: initial;">
          <template v-if="postData.list.length>=1">
            <div class="list" v-for="(item,index) in postData.list" :key="index">
              <div class="listWrap">
                <div class="wrap_1">
                  <div class="w1_1">
                    <div class="w1-img">
                      <img :src="item.userImg" alt="" onerror="this.src='./static/img/head05.png'" alt="">
                    </div>
                    <div>{{ item.username }}</div>
                  </div>
                  <div class="w1_2">{{ item.createTime}}</div>
                </div>
                <div class="wrap_2">
                  <div class="w2-left">
                    <img  :src="item.proImg" :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" alt="">
                  </div>
                  <div class="w2-right">
                    <div class="r1 textEllipsis">{{ item.productName }}</div>
                    <div class="r2">
                    <span v-for="(val,key) in item.protag" :key="key" v-if="key<4">
                      <template v-if="val">{{ val.tagname }}</template>
                    </span>
                    </div>
                    <div class="r3">{{ item.payIntegral }}积分</div>
                    <div class="r4">
                      <span class="icon"></span><span>{{ item.shopName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="height: 100px;line-height: 100px; width: 100%;text-align: center;font-size: 20px">
              您还没有订单
            </div>
          </template>

        </div>
      </div>
      <div class="pagina">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          @current-change="change"
          :total="postData.last_page*10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyIndent",
      data(){
        return {
          postData:{
            list:[]
          },
          listLoading:false
        }
      },
      methods:{
        change(val){
          let that=this
          that.listLoading=true

          that.postData.list=[]
          //获取我的订单列表
          this.$api.axiosPost('/order/getOrderProductList',1,{
            data:{
            },
            page:{
              pageNum:val,
              pageSize:10
            }
          },function (res) {
            let data = res.data.data;
            that.listLoading=false
            that.postData = data;
          })
        },
        desc(id){
          this.$router.push({path:'/indexWrap/shareProject',query:{productId:id}})
        }
      },
      mounted(){
        const that = this;
        // const userId = parseInt(this.$store.state.login.userId)
        this.change(1)

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myIndent";

.el-header, .el-footer {
  background-color: #ececec;
  color: #333;
  line-height: 60px;
}
.el-container{
  font-size: 16px;
  border:1px solid #ececec;
  width: 80% !important;
  margin-bottom: 10px;
}
.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}
.headerImg{
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  float: left;
  margin-top: 9px;
  margin-right: 10px;
}
.username{
  float: left;
}
.headerImg img{height: 100%}
  .shopIcon{float: left;margin-top: 17px;margin-right: 10px;}
  .shopName{float: left;}
  .pro_img{
    width: 200px;
    overflow: hidden;
  }
.prodesc{
  text-align: left;
  padding-left: 20px;

}
.pro_img img{
  width: 100%;
}
  .prodesc div{line-height: 50px !important;}
.prodesc .el-tag{
  margin-right: 10px;
}
</style>
