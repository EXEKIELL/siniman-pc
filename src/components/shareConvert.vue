<template>
  <div id="shareConvert">
    <div class="wrap">
      <div class="list clearFix" v-for="(item,index) in postData.list" :key="index">
        <div class="list-1">
          <div style="overflow: hidden;">
            <img :src="item.user_id.headerimg" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span></span><span>{{item.user_id.username}}</span></div>
            <div><span></span><span>{{item.user_id.shopname}}</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>{{item.user_id.goodcount == null?'0':item.user_id.goodcount}}</span>
            </div>
            <div>
              <span>作品：</span><span>{{item.user_id.productcount == null?'0':item.user_id.productcount}}</span>
            </div>
            <div>
              <span>预约：</span><span>{{item.user_id.bespeakcount == null?'0':item.user_id.bespeakcount}}</span>
            </div>
          </div>
          <div>
            <span>向您支付了{{item.pay_integral == null?'0':item.pay_integral}}积分兑换该模型方案</span>
          </div>
          <div class="huifu" >
            <p>{{item.massage}}</p>
            <div class="huifu1" v-if="item.massagelist.length>0">
              <div class="huifuList" v-for="(item2,index2) in item.massagelist" :key="index2" style="margin-bottom: 20px;">
                <div><span style="min-width: 110px;">{{item2.user_id.username}}：</span><span>{{item2.content}}</span></div>
                <div><span>{{item2.create_time}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-3">
          <div><span>{{item.pay_integral == null?'0':'+'+item.pay_integral}}积分</span></div>
        </div>
        <div class="list-4">
          <div><span>{{item.create_time}}</span></div><!--2018-04-03-->
          <div><span></span><span>回复</span></div>
        </div>

      </div>
      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head02.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span><img src="../../static/img/icon21.png" alt=""></span><span>钱晓慧</span></div>
            <div><span></span><span>诗尼曼全屋定制番禺万博体验店</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>142</span>
            </div>
            <div>
              <span>作品：</span><span>153</span>
            </div>
            <div>
              <span>预约：</span><span>125</span>
            </div>
          </div>
          <div>
            <span>向您支付了50积分兑换该模型方案</span>
          </div>
        </div>
        <div class="list-3">
          <div><span>+50积分</span></div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>
      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head03.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span><img src="../../static/img/icon25.png" alt=""></span><span>钱晓慧</span></div>
            <div><span></span><span>诗尼曼全屋定制番禺万博体验店</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>142</span>
            </div>
            <div>
              <span>作品：</span><span>153</span>
            </div>
            <div>
              <span>预约：</span><span>125</span>
            </div>
          </div>
          <div>
            <span>向您支付了50积分兑换该模型方案</span>
          </div>
          <div class="huifu">
            <p>装修的特别好看，我特别喜欢的北欧风，非常喜欢了。态度非常好，我要把它推荐给我朋友。</p>
            <div class="huifu1">
              <div class="huifuList">
                <div><span>邱梓啊：</span><span>您好，可以的，直接返回上一个页面输入您的联系方式，到时候跟您好时间上门量房</span></div>
                <div><span>2018-04-03</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-3">
          <div><span>+50积分</span></div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>
      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head03.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span><img src="../../static/img/icon25.png" alt=""></span><span>钱晓慧</span></div>
            <div><span></span><span>诗尼曼全屋定制番禺万博体验店</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>142</span>
            </div>
            <div>
              <span>作品：</span><span>153</span>
            </div>
            <div>
              <span>预约：</span><span>125</span>
            </div>
          </div>
          <div>
            <span>向您支付了50积分兑换该模型方案</span>
          </div>
          <div class="huifu">
            <p>装修的特别好看，我特别喜欢的北欧风，非常喜欢了。态度非常好，我要把它推荐给我朋友。</p>
            <div class="huifu1">
              <div class="huifuList">
                <div><span>邱梓啊：</span><span>您好，可以的，直接返回上一个页面输入您的联系方式，到时候跟您好时间上门量房</span></div>
                <div><span>2018-04-03</span></div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-3">
          <div><span>+50积分</span></div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>
      <div class="list clearFix">
        <div class="list-1">
          <div>
            <img src="../../static/img/head02.png" alt="">
          </div>
        </div>
        <div class="list-2">
          <div>
            <div><span><img src="../../static/img/icon21.png" alt=""></span><span>钱晓慧</span></div>
            <div><span></span><span>诗尼曼全屋定制番禺万博体验店</span></div>
          </div>
          <div>
            <div>
              <span>获赞：</span><span>142</span>
            </div>
            <div>
              <span>作品：</span><span>153</span>
            </div>
            <div>
              <span>预约：</span><span>125</span>
            </div>
          </div>
          <div>
            <span>向您支付了50积分兑换该模型方案</span>
          </div>
        </div>
        <div class="list-3">
          <div><span>+50积分</span></div>
        </div>
        <div class="list-4">
          <div><span>2018-04-03</span></div>
          <div><span></span><span>回复</span></div>
        </div>

      </div>
    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="postData.total_page*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareConvert",
      data(){
        return {
          postData:[]
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
        const productId = this.$router.history.current.query.productId;
        const that = this
        //获取兑换详情列表
        // this.$api.axiosPost('/order/exchangeList'+that.$store.state.login.str1,0,{
        //   productId:productId
        // },function (res) {
        //   console.log(res)
        //   that.postData = res.data
        //   let idArr1 = [];
        //   for(var i = 0;i<res.data.list.length;i++){
        //     idArr1[i] = res.data.list[i].id
        //   }
        //   console.log(idArr1)
        //   //评论列表
        //   that.$api.axiosPost('/comment/commentList'+that.$store.state.login.str1,0,{
        //     productId:8,
        //     parentId:1
        //   },function (res) {
        //     console.log(res)
        //   })
        // })
        // 获取列表
        this.$ajax.axiosGet('/user/product/buylist',3,{
          proid:productId,
          page:1
        },function (res) {
          console.log(res);
          if(res.data.status == 200){
            that.postData = res.data.data;
          }
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareConvert";
</style>
