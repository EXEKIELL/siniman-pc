<template>
    <div id="myClientDetail">
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
              <img src="../../static/img/icon39.png" alt="">
            </span>
          </div>
        </div>
        <div class="list2">
          <ul>
            <li>
              <span>客户编号</span>
              <span>客户状态</span>
              <span>门店</span>
              <span>客户名称</span>
              <span>电话号码</span>
              <span>地区</span>
              <span>设计师名称</span>
              <span>创建时间</span>
              <span>结束时间</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
            </li>
            <li>
              <span>C02752642</span>
              <span>已确图未下单</span>
              <span>测试门店</span>
              <span>朱秋冬</span>
              <span>13811111111</span>
              <span>北京湾</span>
              <span>张雪姣</span>
              <span>2004-04-04 04:04:04</span>
              <span>2004-04-04 04:04:04</span>
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
      name: "MyClientDetail",
      data(){
        return {
          value1: '',
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myClientDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
