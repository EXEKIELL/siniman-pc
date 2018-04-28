<template>
  <div id="myPerformaceDetail">
    <div class="wrap">
      <div class="list1">
        <div>
          <input type="text">
          <button>搜索</button>
        </div>
        <div>
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          <span>
              <img src="../../static/img/icon40.png" alt="">
            </span>
        </div>
      </div>
      <div class="list2">
        <ul>
          <li>
            <span>订单编号</span>
            <span>订单类别</span>
            <span>客户姓名</span>
            <span>销售门店</span>
            <span>订单价格</span>
            <span>订单类型</span>
            <span>订单地址</span>
            <span>订单状态</span>
            <span>订单时间</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
          </li>
          <li>
            <span>0000011A180411006</span>
            <span>一般订单（橱柜）</span>
            <span>张若昀</span>
            <span>测试门店</span>
            <span>2222.00</span>
            <span>C（原材料）</span>
            <span>碧桂园</span>
            <span>已作废</span>
            <span>2016.12.08</span>
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
      name: "MyPerformaceDetail",
      data(){
        return {
          value1:''
        }
      },
      mounted(){

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myPerformaceDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
