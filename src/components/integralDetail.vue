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
                  <span>￥550.00</span>
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
            <li v-for="(item,index) in navBtns1"><span :class="{sel:item.selClass}" @click="clickNav(index)">积分明细</span></li>
          </ul>
        </div>
        <div class="cont">
          <ul>
            <li>
              <span>时间</span><span>类型</span><span>类型</span><span>商品/任务/客户</span><span>获得/消耗积分</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分获取</span><span>方案订单</span><span>广州恒大御府  02户型</span><span>+50</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分获取</span><span>成功量房</span><span>张女士（15205201520）</span><span>+50</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分获取</span><span>购买方案</span><span>广州恒大御府  02户型</span><span>-50</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分获取</span><span>图纸确认</span><span>张女士（15205201520）</span><span>+50</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分获取</span><span>订单完成</span><span>广州恒大御府  02户型</span><span>-50</span>
            </li>
            <li>
              <span>2016.12 13:20</span><span>积分消耗</span><span>积分获取</span><span>张女士（15205201520）</span><span>-50</span>
            </li>
          </ul>
        </div>
        <div class="pagina">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
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
          ]
        }
      },
      methods:{
        clickNav(index){
          for(var i = 0;i<this.navBtns1.length;i++){
            this.navBtns1[i].selClass = false;
          }
          this.navBtns1[index].selClass = true
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/integralDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
