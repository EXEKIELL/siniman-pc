<template>
    <div id="myClientDetail">
      <div class="wrap">
        <div class="list1">
          <div>
            <input type="text" v-model="value1">
            <button @click="but">搜索</button>
          </div>
          <div>
            <el-date-picker
              v-model="value2"
              @change="change"
              type="daterange"
              value-format="yyyy-MM-dd"
              :start-placeholder="firstDay"
              :end-placeholder="today">
            </el-date-picker>
            <span></span>
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
              <span>地址</span>
              <span>设计师名称</span>
              <span>创建时间</span>
              <span>结束时间</span>
            </li>
            <li v-for="(item,index) in listData" :key="index">
              <span>{{item.clientNumber?item.clientNumber:''}}</span>
              <span>{{item.currentStatusName?item.currentStatusName:''}}</span>
              <span>{{item.crmShop.shortName?item.crmShop.shortName:''}}</span>
              <span>{{item.name?item.name:''}}</span>
              <span>{{item.phone?item.phone:''}}</span>
              <span>{{item.address?item.address:''}}</span>
              <span>{{item.designerName?item.designerName:''}}</span>
              <span>{{item.createTime?item.createTime:''}}</span>
              <span>{{item.finishTime?item.finishTime:''}}</span>
            </li>
          </ul>
        </div>
        <div class="pagina">
          <el-pagination
            background
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            @current-change="currentChange"
            :total="totalPages*10">
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
          value2:'',
          listValue:[],
          totalPage:0,
          today:'开始日期',
          firstDay:'结束日期',
          listData:[]
        }
      },
      methods:{
        currentChange(val){
          this.getList(val)
        },
        but(){
          this.getList(1)
        },
        change(val){
          this.firstDay=val[0]
          this.today=val[1]
          this.getList(1)
        },

        getList(val){
          let that = this;
          this.$api.axiosPost('/person/getClientList',1,{
            page:val,
            pageSize:10,
            searchDateStart:that.firstDay,
            searchDateEnd:that.today,
            search:that.value1,
          },function (res) {
            let data = res.data.data;
            that.listData = data.datas;
            that.totalPages = data.totalPages;
          })
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

      },
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myClientDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
  #myClientDetail .wrap .list1 > div:nth-child(2) .el-range__icon{
      display: none !important;
  }
  #myClientDetail .wrap .list1 > div:nth-child(2) .el-range-separator{
    color: #b9dcff !important;
    line-height: 55px !important;
  }
  #myClientDetail .wrap .list1 > div:nth-child(2) > span[data-v-7e0ba1d8]:last-child{
    background: url("../../static/img/icon39.png") no-repeat #b9dcff;
    background-position: 50% 50%;
  }
  #myClientDetail .wrap .list1 > div:nth-child(2) .el-date-editor--daterange.el-input__inner{
    width: 225px !important;
  }
</style>
