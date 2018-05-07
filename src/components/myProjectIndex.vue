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
                <div v-for="(item1,index1) in item.list" :key="index1">
                  <div @click="navSel" >{{item1.tagname}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-cont">
          <div class="list1" v-for="(item,index) in productList" :key="index" @click="toUrl(item.id)">
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
              <span v-for="(item,index) in item.producttag" :key="index" v-if="index<4">全属方案</span>
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
          :total="40">
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
          productList:[],
          tags:['','','','']
        }
      },
      methods:{
        navSel(){
          var e = event.target;
          $(e).addClass("sel");
          $(e).parent('div').siblings('div').find('div').removeClass('sel')
          var text = e.innerText;
          var str = $(e).parents('.nav-right').siblings('.nav-left').text()
          str = str.replace(/：/,'')
          if(str=='类型'){
            this.tags[0] = text
          }else if(str=='阶段'){
            this.tags[1] = text
          }else if(str=='户型'){
            this.tags[2] = text
          }else{
            this.tags[3] = text
          }
          console.log(this.tags)
          const that = this
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          this.$api.axiosPost('/product/productList',1,{
            data:{
              userids:[userId],
              tags:that.tags,
              orderByCondition:'DESC',
              orderByField:'productionmark'
            },
            page:{
              pageNum:1,
              pageSize:9
            }
          },function (res) {
            that.productList = res.data.data
          })
        },
        toUrl(val){
          this.$router.push({path:'/indexWrap/myProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          const userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
          this.$api.axiosPost('/product/productList',1,{
            data:{
              userids:[userId],
              orderByCondition:'DESC',
              orderByField:'productionmark'
            },
            page:{
              pageNum:val,
              pageSize:9
            }
          },function (res) {
            that.productList = res.data.data
          })
        }
      },
      mounted(){
        const that = this;
        let userId = JSON.parse(localStorage.getItem('user-info')).data.userid+'';
        //获取方案分页库查询
        this.$api.axiosPost('/product/productList',1,{
          data:{
            orderByCondition:'DESC',
            orderByField:'productionmark',
            userids:[userId]
          },
          page:{
            pageNum:1,
            pageSize:9
          }
        },function (res) {
          that.productList = res.data.data
          console.log(that.productList)
        })
        //标签获取
        this.$api.axiosGet('/tag/getTagList',{},function (res) {
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
