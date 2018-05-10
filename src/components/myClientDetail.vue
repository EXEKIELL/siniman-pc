<template>
    <div id="myClientDetail">
      <div class="wrap">
        <!--<div class="list1">-->
          <!--<div>-->
            <!--<input type="text">-->
            <!--<button>搜索</button>-->
          <!--</div>-->
          <!--<div>-->
            <!--<el-date-picker-->
              <!--v-model="value1"-->
              <!--type="date"-->
              <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
            <!--<span>-->
              <!--<img src="../../static/img/icon39.png" alt="">-->
            <!--</span>-->
          <!--</div>-->
        <!--</div>-->
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
            <li v-for="(item,index) in listValue" :key="index">
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
            :total="totalPage*10">
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
          listValue:[],
          totalPage:0
        }
      },
      methods:{
        currentChange(val){
          let token = JSON.parse(localStorage.getItem('user-data')).token;
          let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          let that = this
          this.$api.axiosPost('/person/getClientList'+that.$store.state.login.str1,1, {
              token: token,
              userId: userId,
              page:val
            }
            ,function (res) {
              console.log(res.data)
              that.listValue = res.data.attributes.datas
              that.totalPage = res.data.attributes.totalPages
              console.log(that.listValue)
            })
        }
      },
      mounted(){
        let that = this
        function listPost(val) {
          let token = JSON.parse(localStorage.getItem('user-data')).token;
          let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          console.log(userId)
          that.$api.axiosPost('/person/getClientList'+that.$store.state.login.str1,1, {
              token: token,
              userId: userId,
              page:val
            }
            ,function (res) {
              if(res.data.code!=null&&res.data.code==1003){
                localStorage.removeItem('user-data')
                localStorage.removeItem('user-info')
                this.$router.push('/login')
              }else{
                console.log(res.data)
                that.listValue = res.data.attributes.datas
                that.totalPage = res.data.attributes.totalPages
                console.log(that.listValue)
              }
            })
        }
        listPost(1)
      },

    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myClientDetail";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
