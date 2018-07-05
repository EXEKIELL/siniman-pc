<template>
  <div id="myPerformaceDetail">
    <div class="wrap">
      <div class="list1">
        <div>
          <input type="text" v-model="value1" placeholder="关键字搜索">
          <button @click="btn">搜索</button>
        </div>
        <div>
          <el-date-picker
            v-model="value2"
            @change="change1"
            type="daterange"
            value-format="yyyy-MM-dd"
            :start-placeholder="firstDay"
            :end-placeholder="today">
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
          orderStatusStart:statusData.orderStatusStart,
          today:'开始日期',
          firstDay:'结束日期',
        }
      },
      methods:{
        change(val){
          this.getList(val)
        },
        getList(val){
          const that = this;
          this.$api.axiosPost('/person/getOrderList',1,{
            page:val,
            pageSize:10,
            searchDateStart:that.firstDay,
            searchDateEnd:that.today,
            search:that.value1,
          },function (res) {
            console.log(res);
            let data = res.data.data;
            that.listData = data.datas;
            that.totalPages = data.totalPages;
          })
        },
        change1(val){
          this.firstDay=val[0]
          this.today=val[1]
          this.getList(1)
        },
        checked(){
          var e = event.target;
          console.log(1)
          $(e).siblings('div').find('input').focus()
        },
        btn(){
            this.getList(1)
        }
      },
      mounted(){
        let that = this
        let date=new Date()

        let today=this.$api.formatDate(date,'yyyy-MM-dd')
        this.today=today
        date.setDate(1)
        let firstDay=this.$api.formatDate(date,'yyyy-MM-dd')
        this.firstDay=firstDay

        this.getList(1)

      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myPerformaceDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
