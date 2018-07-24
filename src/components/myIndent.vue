<template>
    <div id="myIndent">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的订单</span>
        </div>
        <div class="w3-cont" style="flex-wrap: wrap;justify-content: initial;">

          <el-container :span="24" v-for="(item,index) in postData.list" :key="index">
            <el-header>

              <el-row>
                <el-col :span="8">
                  <div class="grid-left bg-purple">
                    <div class="headerImg">
                      <img :src="item.userImg" alt="" onerror="'../../static/img/head05.png'" alt="">
                    </div>
                    <div class="username">{{ item.username }}</div>
                    <div style="clear: both"></div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-left bg-purple">
                    <div class="shopIcon">
                      <img src="../../static/img/icon/icon19.png" alt="">
                    </div>
                    <div class="shopName">{{ item.shopName }}</div>
                  </div>
                </el-col>
                <el-col :span="8"><div class="grid-content bg-purple"></div>
                  {{ item.createTime}}
                </el-col>
              </el-row>
            </el-header>
            <el-main>
              <div @click="desc(item.productId)">
                <el-row>
                  <el-col :span="5">
                    <div class="grid-content bg-purple">
                      <div class="pro_img">
                        <img  :src="item.proImg" :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" alt="">
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="15">
                    <div class="prodesc">
                      <router-link tag="div" :to="{path:'/indexWrap/shareProject',query:{productId:item.productId}}">
                        {{ item.productName }}
                      </router-link>
                      <div>
                        <el-tag v-for="(val,key) in item.protag" :key="key">{{ val.tagname }}</el-tag>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      {{ item.payIntegral }}积分
                    </div>
                  </el-col>
                </el-row>
              </div>

            </el-main>
            <div style="clear: both"></div>
          </el-container>

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
          postData:[]
        }
      },
      methods:{
        change(val){
          let that=this
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
