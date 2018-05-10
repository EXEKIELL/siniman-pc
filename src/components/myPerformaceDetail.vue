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
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
          let token = localStorage.getItem('user-data')?JSON.parse(localStorage.getItem('user-data')).token:this.$store.state.login.token
          const that = this;
          this.$api.axiosPost('/person/getOrderList'+that.$store.state.login.str1,1,{
            search:that.value1,
            searchDateStart:that.value2==null?'':that.value2[0],
            searchDateEnd:that.value2==null?'':that.value2[1],
            page:val,
            pageSize:10,
            userId:userId,
            token:token
          },function (res) {
            var ress = res.data.data
            ress = JSON.parse(ress)
            that.listData = ress.attributes.datas
            console.log(that.listData)
          })
        },
        change1(val){
          console.log(val)
        },
        checked(){
          var e = event.target;
          console.log(1)
          $(e).siblings('div').find('input').focus()
        },
        btn(){
          console.log(this.value1,this.value2)
          const that = this
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
          let token = localStorage.getItem('user-data')?JSON.parse(localStorage.getItem('user-data')).token:this.$store.state.login.token
          //搜索查询业绩列表
          this.$api.axiosPost('/person/getOrderList'+that.$store.state.login.str1,1,{
            search:that.value1,
            searchDateStart:that.value2==null?'':that.value2[0],
            searchDateEnd:that.value2==null?'':that.value2[1],
            page:1,
            pageSize:10,
            userId:userId,
            token:token
          },function (res) {
            var ress = res.data.data
            ress = JSON.parse(ress)
            console.log(ress)
            that.listData = ress.attributes.datas
            console.log(that.listData)
            that.totalPages = ress.attributes.totalPages
            that.totalRecords = ress.attributes.totalRecords
          })
        }
      },
      mounted(){
        console.log(statusData.tags)
        const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
        let token = localStorage.getItem('user-data')?JSON.parse(localStorage.getItem('user-data')).token:this.$store.state.login.token
        const that = this;
        //查询业绩列表
        this.$api.axiosPost('/person/getOrderList'+that.$store.state.login.str1,1,{
          search:that.value1,
          searchDateStart:that.value2==null?'':that.value2[0],
          searchDateEnd:that.value2==null?'':that.value2[1],
          page:1,
          pageSize:10,
          userId:userId,
          token:token
        },function (res) {
          var ress = res.data.data
          ress = JSON.parse(ress)
          console.log(ress)
          that.listData = ress.attributes.datas
          console.log(that.listData)
          that.totalPages = ress.attributes.totalPages
          that.totalRecords = ress.attributes.totalRecords
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
