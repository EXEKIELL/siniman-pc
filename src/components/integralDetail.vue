<template>
    <div id="integralDetail">
      <div class="list1">
        <div class="l1-title">
          <span>我的积分</span>
        </div>
        <div class="l1-cont">
          <div>
            <div class="bj">
              <div>
                <div>
                  <span>积分余额</span>
                </div>
                <div>
                  <span>201612-2018.02</span>
                </div>
                <div>
                  <span>￥{{score}}.00</span>
                </div>
              </div>
              <div>
                <img src="../../static/img/icon36.png" alt="">
              </div>
            </div>
          </div>
          <div>
            <div class="bj">
              <div>
                <div>
                  <span>近三个月获得积分</span>
                </div>
                <div>
                  <span>201612-2018.02</span>
                </div>
                <div>
                  <span>￥1000.00</span>
                </div>
              </div>
              <div class="list-right">
                <img src="../../static/img/icon36.png" alt="">
              </div>
            </div>
          </div>
          <div>
            <div class="bj">
              <div>
                <div>
                  <span>近三个月消耗积分</span>
                </div>
                <div>
                  <span>201612-2018.02</span>
                </div>
                <div>
                  <span>￥450.00</span>
                </div>
              </div>
              <div>
                <img src="../../static/img/icon36.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list2">
        <div class="nav">
          <ul>
            <li v-for="(item,index) in navBtns1"><span :class="{sel:item.selClass}" @click="clickNav(index)">{{item.text}}</span></li>
          </ul>
        </div>
        <div class="cont">
          <ul>
            <li>
              <span>时间</span><span>类型</span><span>动作</span><span>商品/任务/客户</span><span>获得/消耗积分</span>
            </li>
            <li v-for="(item,index) in postList" :key="index">
              <span>{{item.createTime}}</span><span>{{item.score<0?'积分消耗':'积分获取'}}</span><span>{{item.action}}</span><span>{{item.description}}</span><span>{{item.score<0?item.score:('+'+item.score)}}</span>
            </li>
          </ul>
        </div>
        <div class="pagina">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="change"
            :total="40">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "IntegralDetail",
      data(){
        return {
          navBtns1:[
            {text:"积分明细",selClass:true},
            {text:"积分获取",selClass:false},
            {text:"积分消耗",selClass:false}
          ],
          postList:[],
          score:JSON.parse(localStorage.getItem('user-info')).data.score
        }
      },
      methods:{
        clickNav(index){
          for(var i = 0;i<this.navBtns1.length;i++){
            this.navBtns1[i].selClass = false;
          }
          this.navBtns1[index].selClass = true
        },
        change(val){
          let that = this;
            let token = JSON.parse(localStorage.getItem('user-data')).token;
            let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
            that.$api.axiosPost('/person/getUserScoreRecords'+that.$store.state.login.str1,1,{
              token:token,
              userId:userId,
              page:val,
              pageSize:'10'
            },function (res) {
              console.log(res)
              that.postList = res.data.attributes.records
            })
        }
      },
      filters:{

      },
      mounted(){
        let that = this;
        function listPost(val) {
          let token = JSON.parse(localStorage.getItem('user-data')).token;
          let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          //用户积分记录
          that.$api.axiosPost('/person/getUserScoreRecords'+that.$store.state.login.str1,1,{
            token:token,
            userId:userId,
            page:val,
            pageSize:'10'
          },function (res) {
            console.log(res)
            that.postList = res.data.attributes.records
          })
          //用户积分统计
          that.$api.axiosPost('/person/getUserScore'+that.$store.state.login.str1+'&type=1',1,{
            token:token,
            userId:userId,
            searchDateStart:'2017-10-24',
            searchDateEnd:'2017-12-28'
          },function (res) {
            console.log(res)
            // that.postList = res.data.attributes.records
          })
        }
        listPost(1)
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/integralDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
