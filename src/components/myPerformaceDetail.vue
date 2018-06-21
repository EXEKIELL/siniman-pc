<template>
  <div id="myPerformaceDetail">
    <div class="wrap">
      <div class="list1">
        <div>
          <input type="text" v-model="value1">
          <button @click="btn">搜索</button>
        </div>
        <div>
          <el-date-picker
            v-model="value2"
            @change="change1"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="选择日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <span @click="checked"></span>
        </div>
      </div>
      <div class="list2">
        <ul>
          <li>
            <span>订单编号</span>
            <span>订单类别</span>
            <span>客户姓名</span>
            <span>销售门店</span>
            <span>订单类型</span>
            <span>订单地址</span>
            <span>订单状态</span>
            <span>订单时间</span>
          </li>
          <li v-for="(item,index) in listData" :key="index">
            <span>{{item.orderNumber}}</span>
            <span>{{item.orderTypeName}}</span>
            <span>{{item.crmClient.name}}</span>
            <span>{{item.crmShop.shortName}}</span>
            <span>{{item.orderSortName}}</span>
            <span>{{item.orderAddress}}</span>
            <span>{{item.orderStatusName}}</span>
            <span>{{item.modifyDate}}</span>
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
          :total="totalPages*10">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import statusData from '../../static/js/staticData'
    export default {
      name: "MyPerformaceDetail",
      data(){
        return {
          value1:'',
          value2:'',
          listData:[],
          totalPages:null,
          totalRecords:null,
          orderType:statusData.orderType,
          orderSort:statusData.orderSort,
          orderStatusStart:statusData.orderStatusStart
        }
      },
      methods:{
        change(val){
          const that = this;
          this.$ajax.axiosGet('/user/sales',3,{
            page:val
          },function (res) {
            console.log(res);
            let data = res.data.orderlist.attributes;
            that.listData = data.datas;
            that.totalPages = data.totalPages;
          })
        },
        change1(val){
          console.log(val);
        },
        checked(){
          var e = event.target;
          console.log(1)
          $(e).siblings('div').find('input').focus()
        },
        btn(){
          console.log(this.value1,this.value2);
          const that = this;
          let value1 = this.value1;
          value1 = value1.replace(/\s|\xA0/g,'');
          this.$ajax.axiosGet('/user/sales',3,{
            page:1,
            orderStatusStart:that.value2==null?'':that.value2[0],
            searchDateEnd:that.value2==null?'':that.value2[1],
            search:value1
          },function (res) {
            console.log(res);
            let data = res.data.orderlist.attributes;
            that.listData = data.datas;
            that.totalPages = data.totalPages;
          })
        }
      },
      mounted(){
        const that = this;
        this.$ajax.axiosGet('/user/sales',3,{
          page:1
        },function (res) {
          console.log(res);
          let data = res.data.orderlist.attributes;
          that.listData = data.datas;
          that.totalPages = data.totalPages;
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myPerformaceDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
