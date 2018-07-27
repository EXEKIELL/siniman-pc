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
                  <span>{{ ago }}-{{ today }}</span>
                </div>
                <div>
                  <span>￥{{list1.total}}</span>
                </div>
              </div>
              <div>
                <img src="../../static/img/icon36.png" alt="">
                <button class="link" @click="golink">积分兑换</button>
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
                  <span>{{ ago }}-{{ today }}</span>
                </div>
                <div>
                  <span>￥{{list1.obtain}}</span>
                </div>
              </div>
              <div class="list-right">
                <img src="../../static/img/icon37.png" alt="">
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
                  <span>{{ ago }}-{{ today }}</span>
                </div>
                <div>
                  <span>￥{{list1.consume}}</span>
                </div>
              </div>
              <div>
                <img src="../../static/img/icon38.png" alt="">
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
            :total="totalPage*10">
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
          score:'',//JSON.parse(localStorage.getItem('user-info')).data.score,
          list1:{
            total:0,
            obtain:0,
            consume:0
          },
          totalPage:1,
          type:2,
          today:'',
          ago:'',
          current_page:1
        }
      },
      methods:{
        clickNav(index){
          const that = this;
          for(var i = 0;i<this.navBtns1.length;i++){
            this.navBtns1[i].selClass = false;
          }
          this.navBtns1[index].selClass = true;

          if(index == 0){
            this.type = 2;
          }else if(index == 1){
            this.type = 0;
          }else{
            this.type = 1;
          }
          this.change(1)
        },

        change(val){
          let that = this;
          that.postList=[]
          //用户积分明细列表
          this.$api.axiosPost('/person/getUserScoreRecords',1,{
            type:that.type,
            page:val,
            pageSize:"10",
          },function (res) {
            that.postList = res.data.data.records
            if(that.postList.length>=10 ){

              if(val==that.totalPage ){
                that.totalPage++
              }

            }

          })
        },
        /*去积分商城 */
        golink(){
          let sysconfig=JSON.parse(localStorage.getItem('sysconfig'))
          let userpsw=JSON.parse(localStorage.getItem('userpsw'))
          window.open(sysconfig.points_mall.value+'?username='+userpsw.user+'&password='+userpsw.psw)
        },
      },
      filters:{

      },
      mounted(){
        let that = this;

        let date=new Date();
        that.today=that.$api.formatDate(date,'yyyy.MM.dd')
        date.setMonth( date.getMonth()-3 );
        that.ago=that.$api.formatDate(date,'yyyy.MM.dd')

        // //用户积分统计
        this.$api.axiosPost('/person/getUserScore',1,{
          searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
          searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
          type:2, //全部
        },function (res) {
          that.list1.total=res.data.data.score
        });

        this.$api.axiosPost('/person/getUserScore',1,{
          searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
          searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
          type:0, //获取
        },function (res) {
          that.list1.obtain=res.data.data.score
        });

        this.$api.axiosPost('/person/getUserScore',1,{
          searchDateStart:that.$api.formatDate(new Date(that.ago.replace(/\./g, '/')),'yyyy-MM-dd'),
          searchDateEnd:that.$api.formatDate(new Date(that.today.replace(/\./g, '/')),'yyyy-MM-dd'),
          type:1, //消耗
        },function (res) {
          that.list1.consume=Math.abs(res.data.data.score)
        });

        this.change(1)

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/integralDetail";
  .nav{
    position: relative;
  }
.link{
  position: absolute;
  bottom: 0.8rem;
  background-color: #ffffff;
  padding: 5px 5px;
  cursor: pointer;
  color: #f8917c;
  font-size: 14px;
  font-weight: lighter;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
  .link:hover{
    -webkit-box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    -moz-box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
