<template>
    <div id="projectConvert">
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
              <span>向您支付了{{ item.payIntegral }}积分兑换该模型方案</span>
            </div>
            <div class="huifu" v-if="item.content">
              <p>{{ item.content }}</p>
              <div class="huifuBox" v-if="item.huifu">
                <el-input
                  type="textarea"
                  :rows="2"
                  v-model="item.huifu.huifuContent"
                  :placeholder="'回复'+item.username+'：'">
                </el-input>
                <div class="huifuButton">
                  <el-button type="primary" @click="submitHuifu(item.huifu,index)">保存</el-button>
                  <el-button type="info" plain @click="huifuBox(index,item.msgid)">取消</el-button>
                </div>
              </div>
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

            <div v-show="item.content" style="margin-top: 10px" @click="huifuBox(index,item.msgid,item.userId,item.id)"><span></span><span>回复</span></div>
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
    import {Message} from "element-ui"
    export default {
      name: "ProjectConvert",
      props:["productId"],
      data(){
        return{
            orderList:[],
            last_page:1,
            username:''
        }
      },
      mounted(){

        let user_info=JSON.parse(localStorage.getItem("user-info"))
        this.username=user_info.username
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
        huifuBox(index,msgid,userId,order_id){
          let that=this
          that.$forceUpdate();
          if(that.orderList[index].huifu){
            that.orderList[index].huifu=false
          }else{
            that.orderList[index].huifu={
              huifuContent:'',
              msgid:msgid,
              index:index,
              userId:userId,
              username:that.username,
              order_id:order_id
            }
          }
        },
        submitHuifu(item,index){
            let that=this
            let date=new Date()
            that.loading=true
            that.$forceUpdate();

            if(!item.huifuContent){
              Message.error("请输入您的回复")
              return false
            }

            that.$api.axiosPost('ordermassage/addordmassage',1,{
              data:{
                content:item.huifuContent,
                msgid:item.msgid,
                parent_uid:item.userId,
                order_id:item.order_id,
              },
              page:{
                pageNum:0,
                pageSize:1
              }
            },function(res){
              that.loading=false
              that.orderList[index].comment.unshift({
                username:item.username,
                content:item.huifuContent,
                createTime:that.$api.formatDate(date,"yyyy-MM-dd hh:mm:ss")
              })

              that.orderList[index].huifu=false
            })
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
@import "../../static/sass/projectConvert";
  .headerImg{
    overflow: hidden;
  }
.headerImg img{
  width:  auto !important;
  height: 100% !important;
}

</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
