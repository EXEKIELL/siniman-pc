<template>
  <div id="myShop">
    <div class="list1">
      <div>
        <div>
          <select name="province" id="province">
            <option value="广东省">广东省</option>
            <option value="山东省">山东省</option>
            <option value="四川省">四川省</option>
          </select>
        </div>
        <div>
          <select name="city" id="city">
            <option value="广州市">广州市</option>
            <option value="青岛市">青岛市</option>
            <option value="成都市">成都市</option>
          </select>
        </div>
        <div>
          <select name="district" id="discrict">
            <option value="天河区">天河区</option>
            <option value="青岛市">市南区</option>
            <option value="成都市">锦江区</option>
          </select>
        </div>
      </div>
      <div>
        <input type="text" placeholder="请输入搜索内容">
        <button>搜索</button>
      </div>
    </div>
    <div class="list2">
      <ul>
        <li>
          <span>名称</span>
          <span>地址</span>
          <span>联系方式</span>
          <span>店长名称</span>
          <span>门店销售</span>
          <span>方案数量</span>
          <span>备注</span>
        </li>
        <li v-for="(item,index) in postList" :key="index">
          <span>{{item.shopname}}</span>
          <span>{{item.detailaddress}}</span>
          <span>{{item.shopcontact}}</span>
          <span>{{JSON.parse(userInfo).data.username}}</span>
          <span>{{item.shopsales}}</span>
          <span>3</span>
          <span @click="NavTo(item.id)">查看详情</span>
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
        :total="40">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MyShop",
      data(){
        return {
          postList:[],
          userInfo:localStorage.getItem('user-info')
        }
      },
      methods:{
        NavTo(shopId){
          this.$router.push({path:"/indexWrap/myShopXq",query:{shopId:shopId}})
        },
        change(val){
          console.log(val)
          const that = this;
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
          this.$api.axiosPost('/shop/getShopList',1,{
            data:{
              userId:userId,
              orderByCondition:'desc',
              orderByField:'score'
            },
            page:{
              pageNum:val-1,
              pageSize:10
            }
          },function (res) {
            console.log(res)
            that.postList = res.data
          })
        }
      },
      mounted(){
        const that = this
        const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
        console.log(userId)
        this.$api.axiosPost('/shop/getShopList',1,{
          data:{
            userId:userId,
            orderByCondition:'desc',
            orderByField:'score'
          },
          page:{
            pageNum:0,
            pageSize:10
          }
        },function (res) {
          console.log(res)
          that.postList = res.data
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myShop";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
