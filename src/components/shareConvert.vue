<template>
  <div id="shareConvert">
    <div class="wrap">
      <div class="list clearFix" v-for="(item,index) in orderList">
        <div class="list-1">
          <div class="headerImg">
            <img :src="item.userImg" alt="" onerror="'../../static/img/head05.png'">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span></span><span>{{ item.username }}</span></div>
            <div><span></span><span>{{ item.shoplist[0].shopname }}</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>{{ item.goodcount }}</span>
            </div>
            <div>
              <span>作品：</span><span>{{ item.userProCount }}</span>
            </div>
            <div>
              <span>预约：</span><span>{{ item.bespeakcount }}</span>
            </div>
          </div>
          <div>
            <span>支付了{{ item.payIntegral }}积分兑换该模型方案</span>
          </div>
          <div class="huifu" v-if="item.content">
            <p>{{ item.content }}</p>

            <div class="huifu1" v-if="item.comment.length>=1" style="margin-top: 10px">
              <div class="huifuList" v-for="val in item.comment">
                <div><span>{{ val.username }}：</span><span>{{ val.content }}</span></div>
                <div><span>{{ getDate(val.createTime) }}</span></div>
              </div>
            </div>

          </div>
        </div>
        <div class="list-3">
          <div><span>+{{ item.payIntegral }}积分</span></div>
        </div>
        <div class="list-4">
          <div><span>{{ getDate(item.createTime) }}</span></div>

          <div  style="margin-top: 10px;display: none"><span></span><span>回复</span></div>
        </div>

      </div>
    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="pageChange"
        :total="last_page*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareConvert",
      data(){
        return{
          orderList:[],
          last_page:1,
          username:'',
          productId:''
        }
      },
      filters:{
        time:function (val) {
          let time = val;
          time = new Date(time);
          let yyyy = time.getFullYear();
          let mm = time.getMonth()+1;
          let dd = time.getDay();
          time = yyyy+'-'+mm+'-'+dd
          return time
        }
      },
      created(){

      },
      mounted(){
        let productId = this.$router.history.current.query.productId;
        this.productId=productId
        this.getList(1)


      },
      methods:{
        getDate(str){
          let that=this
          let timeStr=str.replace(/-/g,':').replace(' ',':')
          let time=timeStr.split(':')
          let date=new Date(time[0],(time[1]-1),time[2],time[3],time[4],time[5])
          return that.$api.formatDate(date,"yyyy-MM-dd")

        },
        pageChange(val){
          this.getList(val)
        },
        getList(val){
          let that=this
          that.$api.axiosPost('/order/exchangeList',1,{
            data:{
              product_id:that.productId
            },
            page:{
              pageNum:val,
              pageSize:10
            }
          },function (res) {
            that.orderList = res.data.data.list
            that.last_page = res.data.data.last_page
            that.$forceUpdate();
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareConvert";
.headerImg{
  overflow: hidden;
}
.headerImg img{
  width:  auto !important;
  height: 100% !important;
}
.huifuButton{
  text-align: right;
  margin-top: 15px;
}
</style>
