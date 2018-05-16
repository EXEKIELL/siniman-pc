<template>
    <div id="accountAssignment">
      <div class="wrap">
        <div class="list1">
          <!--<div class="l1-1">-->
            <!--<button>-->
              <!--<span></span><span>批量删除</span>-->
            <!--</button>-->
            <!--<button>-->
              <!--<span></span><span>添加</span>-->
            <!--</button>-->
          <!--</div>-->
          <!--<div class="l1-2">-->
            <!--<div>-->
              <!--<select name="username" id="username">-->
                <!--<option value="user">用户名1</option>-->
                <!--<option value="user">用户名2</option>-->
                <!--<option value="user">用户名3</option>-->
              <!--</select>-->
              <!--<button @click="la">-->
                <!--<img src="../../static/img/icon57.png" alt="">-->
              <!--</button>-->
            <!--</div>-->
            <!--<div>-->
              <!--&lt;!&ndash;<input type="text" placeholder="请输入搜索内容">&ndash;&gt;-->
              <!--<button>搜索</button>-->
            <!--</div>-->
          <!--</div>-->
        </div>
        <div class="list2">
          <ul>
            <li>
              <div><span>用户名称</span></div>
              <div><span>所属角色</span></div>
              <div><span>姓名</span></div>
              <div><span>联系方式</span></div>
              <div><span>方案数量</span></div>
              <div><span>登录次数</span></div>
              <div><span>创建时间</span></div>
            </li>
            <li class="contList" v-for="(item,index) in userList" :key="index">
              <div><span>{{item.account}}</span></div>
              <div><span>{{item.roles|str}}</span></div>
              <div><span>{{item.username}}</span></div>
              <div><div><span></span><span>{{'手机：'+item.phone}}</span></div></div>
              <div><span>{{item.productCount==null?0:item.productCount}}</span></div>
              <div><span>{{item.logincount}}</span></div>
              <div><span>{{item.createtime|time}}</span></div>
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
            :total="dataList.pages*10">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import method from '../../static/js/public'
    export default {
      name: "AccountAssignment",
      data(){
        return {
          dataList:{},
          userList:[]
        }
      },
      methods:{
        selAll(){
          var e =event.target
          $('.contList .seled').show()
          $(e).siblings('span').show()
          $('.seleBox').attr({
            checked:"checked"
          })
        },
        clAll(){
          var e = event.target
          $(e).hide()
          $('.contList .seled').hide()
          $('.seleBox').removeAttr("checked")
        },
        xuanzhong(index){
          var e = event.target
          $(e).attr({
            checked:"checked"
          })
          $(e).siblings('span').show();
        },
        qxXuanzhong(index){
          var e = event.target
          $(e).hide()
          $('.seleBox').removeAttr("checked")
        },
        la(){
          console.log(1)
        },
        change(val){
          let that = this;
          this.$api.axiosPost('./user/getUserList'+that.$store.state.login.str1,1,{
            data:{
              orderByCondition:'desc',
              orderByField:'score'
            },
            page:{
              pageNum:val-1,
              pageSize:10
            }
          },function (res) {
            that.dataList = res.data
            that.userList = res.data.list
          })
        }
      },
      filters:{
        time:function (val) {
          var val = method.transformDate(val)
          return val
        },
        str:function (val) {
          var val = JSON.parse(val)
          var role = []
          console.log(val.roles)
          for (var i = 0; i < val.roles.length; i++) {
            role[i] = val.roles[i].code
          }
          console.log(role)
          if(role.indexOf('DEALER')!=-1){
            return '经销商'
          }else if(role.indexOf('SHOPMANAGER')!=-1){
            return '店长'
          }else if(role.indexOf('SHOPPINGGUIDE')!=-1){
            return '家居顾问'
          }else{
            return '设计师'
          }
        }
      },
      mounted(){
        let that = this
        //获取账户列表
        this.$api.axiosPost('./user/getUserList'+that.$store.state.login.str1,1,{
          data:{
            orderByCondition:'desc',
            orderByField:'score'
          },
          page:{
            pageNum:0,
            pageSize:10
          }
        },function (res) {
          that.dataList = res.data
          that.userList = res.data.list
          console.log(res)
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/accountAssignment";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
