<template>
    <div id="myProjectIndex">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的方案</span>
        </div>
        <div class="w3-nav">
          <ul>
            <li class="clearFix" v-for="(item,index) in tagsList" :key="index">
              <span class="nav-left">{{item.catalogname+'：'}}</span>
              <div class="nav-right">
                <div>
                  <div @click="navSel('全部',index)" class="sel" >全部</div>
                </div>
                <div v-for="(item1,index1) in item.list" :key="index1">
                  <div @click="navSel(index,index1)" >{{item1.tagname}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-cont">
          <div class="list1" v-for="(item,index) in productList.list" :key="index" @click="toUrl(item.id)">
            <div class="list1-img">
              <img src="../../static/img/img05.png" alt="">
            </div>
            <div class="list1-cont">
              <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span><span>{{item.area}}m²</span></div>
              <div class="l1cont-2 clearFix">
                <div>
                  <span></span><span>{{item.customername}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customercontact}}</span>
                </div>
                <div>
                  <span></span><span>{{item.customeraddr}}</span>
                </div>
              </div>
            </div>
            <div class="list1-tag">
              <span v-for="(item,index) in item.producttag" :key="index" v-if="index<4">{{item.tagname}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="pagina">
        <el-pagination
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          @current-change="change"
          :total="productList.pages*10">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "MyProjectIndex",
      data(){
        return {
          tagsList:[],
          productList:{},
          tags:[],
          postTags:[],
          orderByField:''
        }
      },
      methods:{
        navSel(val,val1){
          var e = event.target;
          $(e).addClass("sel");
          $(e).parent('div').siblings('div').find('div').removeClass('sel')

          //  标签筛选
          if(val != '全部'){
            this.tags[val+''] = val1
          }else{
            delete this.tags[val1+'']
          }
          let tags1 = [];
          this.postTags = []
          for (var key in this.tags) {
            var index = key,
              index1 = this.tags[key]
            this.postTags.push(this.tagsList[index].list[index1].catalogcode)
          }

          const that = this
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          this.$api.axiosPost('/product/productList'+that.$store.state.login.str1,1,{
            data:{
              userids:[userId],
              tags:that.postTags,
              orderByCondition:'DESC',
              orderByField:that.orderByField
            },
            page:{
              pageNum:1,
              pageSize:9
            }
          },function (res) {
            console.log(res)
            that.productList = res.data
          })
        },
        toUrl(val){
          this.$router.push({path:'/indexWrap/myProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          this.$api.axiosPost('/product/productList'+that.$store.state.login.str1,1,{
            data:{
              userids:[userId],
              tags:that.postTags,
              orderByCondition:'DESC',
              orderByField:that.orderByField
            },
            page:{
              pageNum:val,
              pageSize:9
            }
          },function (res) {
            that.productList = res.data
          })
        }
      },
      mounted(){
        const that = this;
        let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
        //获取方案分页库查询
        this.$api.axiosPost('/product/productList'+that.$store.state.login.str1,1,{
          data:{
            userids:[userId],
            tags:that.postTags,
            orderByCondition:'DESC',
            orderByField:that.orderByField
          },
          page:{
            pageNum:1,
            pageSize:9
          }
        },function (res) {
          that.productList = res.data
          console.log(res)
        })
        //标签获取
        this.$api.axiosGet('/tag/getTagList'+that.$store.state.login.str1,{},function (res) {
          console.log(res.data)
          that.tagsList = res.data
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myProjectIndex";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
