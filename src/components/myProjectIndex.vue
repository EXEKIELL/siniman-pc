<template>
    <div id="myProjectIndex">
      <div class="wrap3">
        <div class="w3-title">
          <span>我的方案</span>
        </div>
        <div class="w3-nav">
          <ul>
            <li class="clearFix">
              <span class="nav-left">状态：</span>
              <div class="nav-right">
                <div @click="prostatu(1)">
                  <div :class="{sel:prostatus==1}">上架中</div>
                </div>
                <div @click="prostatu(0)">
                  <div :class="{sel:prostatus==0}">待审核</div>
                </div>
              </div>
            </li>

            <li class="clearFix" v-for="(item,index) in tagsList" :key="index">
              <span class="nav-left">{{item.cat_name+'：'}}</span>
              <div class="nav-right">
                <div>
                  <div @click="navSel('全部',index)" class="sel" >全部</div>
                </div>
                <div v-for="(item1,index1) in item.lists" :key="index1">
                  <div @click="navSel(index,index1)" >{{item1.tagname}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="w3-cont">
          <div class="list1" v-for="(item,index) in productList.list" :key="index" @click="toUrl(item.id)">
            <div class="list1-img">
              <img :src="item.simg" :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" alt="">
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
              <span v-for="(item,index) in item.producttag[0]" :key="index" v-if="index<4">{{item.tagname}}</span>
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
          :total="productList.last_page*10">
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
          orderByField:'salsecount',
          prostatus:1
        }
      },
      methods:{
        navSel(val,val1){
          const that = this

          $('.clearFix').find('.nav-right div').on("click",function(){
            $(this).parent().find('div').removeClass("sel")
            $(this).children('div').addClass("sel")
          })
          //  标签筛选
          if(val != '全部'){
            this.tags[val+''] = val1
          }else{
            delete this.tags[val1+'']
          }

          let tags1 = [];
          this.postTags = [];
          for (var key in this.tags) {
            var index = key,
              index1 = this.tags[key]
            this.postTags.push(this.tagsList[index].lists[index1].id)

          }

          this.change(1)
        },
        toUrl(val){
          this.$router.push({path:'/indexWrap/myProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          //获取方案列表
          this.$api.axiosPost('/product/productList',1,{
            data:{
              prostatus:that.prostatus,
              tags:that.postTags,
              orderByCondition:'DESC',
              orderByField:that.orderByField,
            },
            page:{
              pageNum:val,
              pageSize:9
            }
          },function (res) {
            let data = res.data.data;
            that.productList = data;
          })
        },
        prostatu(val){

          this.prostatus=val
          this.change(1)
        }
      },
      mounted(){
        let that = this;

        // //标签获取
        this.$api.axiosPost('/tag/getTagList',1,{},function (res) {

          that.tagsList = res.data.data
        })

        //获取方案列表
        this.change(1)
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myProjectIndex";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
