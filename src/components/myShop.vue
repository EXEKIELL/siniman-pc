<template>
  <div id="myShop">
    <div class="list1">
      <div>
        <div>
          <el-select v-model="value1" placeholder="请选择省" @change="selPro" popper-class="abc">
            <el-option  value="">
              <span>请选择省</span>
            </el-option>
            <el-option
              v-for="item in province"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="value2" placeholder="请选择市" @change="selCity" popper-class="abc" no-data-text="请先选择省">
            <el-option  value="">
              <span>请选择市</span>
            </el-option>
            <el-option
              v-for="item in city"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-select v-model="value3" placeholder="请选择区" @change="selRegion" popper-class="abc" no-data-text="请先选择市">
            <el-option  value="">
              <span>请选择区</span>
            </el-option>
            <el-option
              v-for="item in region"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <!--<input type="text" placeholder="请输入搜索内容">-->
        <button @click="search">搜索</button>
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
        <li v-for="(item,index) in postList.list" :key="index">
          <span>{{item.shopname}}</span>
          <span>{{item.detailaddress}}</span>
          <span>{{item.shopcontact}}</span>
          <span>{{JSON.parse(userInfo).data.username}}</span>
          <span>{{item.shopsales == null?0:item.shopsales}}</span>
          <span>{{item.shopCount}}</span>
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
        :total="postList.pages*10">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import addr from '../../static/js/address'
    export default {
      name: "MyShop",
      data(){
        return {
          value1:'',
          value2:'',
          value3:'',
          province:[],
          city:[],
          region:[],
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
          this.$api.axiosPost('/shop/getShopList'+that.$store.state.login.str1,1,{
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
        },
        selPro(val){
          console.log(val)
          //选择省查询子集
          const that = this;
          this.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
            parentId:val
          },function (res) {
            that.city = res.data
            if(val == ''){
              that.city = [];
              that.value2 = '';
              that.region = [];
              that.value3 = '';
            }
          })
        },
        selCity(val){
          //选择省查询子集
          const that = this;
          this.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
            parentId:val
          },function (res) {
            that.region = res.data
            if(val == ''){
              that.region = []
              that.value3 = ''
            }
          })
        },
        selRegion(val){

        },
        search(){
          console.log(this.value1,this.value2,this.value3)
          let province = parseInt(this.value1);
          let city = parseInt(this.value2);
          let region = parseInt(this.value3);
          const that = this
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
          that.$api.axiosPost('/shop/getShopList'+that.$store.state.login.str1,1,{
            data:{
              userId:userId,
              orderByCondition:'desc',
              orderByField:'score',
              province:province,
              city:city,
              region:region
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
      },
      mounted(){
        console.log(addr)
        const that = this
        const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+''
        //地区查询
        this.$api.axiosGet('/area/getByParentId'+that.$store.state.login.str1,{
          parentId:''
        },function (res) {
          console.log(res.data)
          that.province = res.data
          that.$api.axiosPost('/shop/getShopList'+that.$store.state.login.str1,1,{
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
