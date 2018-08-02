<template>
    <div id="myProjectIndex" >
      <div class="wrap3">
        <div class="w3-title">
          <span>我的方案</span>
        </div>
        <div class="w3-nav" v-loading.body="listLoading">
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
                <div @click="prostatu(-1)">
                  <div :class="{sel:prostatus==-1}">未通过方案</div>
                </div>
              </div>
            </li>

            <li class="clearFix" v-for="(item,index) in tagsList" :key="index">
              <span class="nav-left">{{item.cat_name+'：'}}</span>
              <div class="nav-right clearFix">
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
          <template v-if="productList.list.length>=1">

            <div class="list1" v-for="(item,index) in productList.list" :key="index" @click="toUrl(item.id)" style="position: relative">
              <div class="list1-img">
                <div class="img">
                  <div v-if="item.download==1 && item.prostatus!=-1" class="download" style="background-image: url('./static/img/icon2_03.png')"></div>
                  <img :class="'bigimg_'+index" v-if="item.renders.length>=1" :src="item.renders[0].img"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
                  <img :class="'bigimg_'+index" v-else :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
                </div>
                <div v-if="item.prostatus==1" class="share" style="top: -1px;left: 0; z-index: 200">
                  <button style="border: 0;background-color: rgba(255,0,0,0.8);" @click.stop="share(item.id)">分享到朋友圈</button>
                </div>
                <div v-if="item.prostatus==-1" class="share" style="top: -1px;right: 0; z-index: 200">
                  <button style="border: 0;background-color: rgba(255,0,0,0.8);float: right;margin-right: 0" @click.stop="updateProstatus(index)">提交方案</button>
                </div>
                <div v-if="item.renders.length>=1">
                  <div v-for="val in item.renders">
                    <img :src="val.img" @mouseenter="replaImg(index,val.img)" alt="">
                    <div class="maskSm">
                    </div>
                  </div>
                </div>
              </div>
              <div class="list1-wrap">
                <div class="list1-cont">
                  <div class="price">
                    <div>{{ item.productionmark }}积分 {{ item.bigimg }}</div>
                    <div class="totalPrice" v-if="item.totalPrice">&nbsp;&nbsp;总价：¥{{ item.totalPrice }}</div>
                    <div class="area"><span>{{item.area}}m²</span></div>
                  </div>
                  <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span></div>

                  <div class="l1cont-2 clearFix" v-if="item.customername != ''">
                    <div>
                      <span></span><span>{{item.customername}}</span>
                    </div>
                    <div>
                      <span></span><span>{{phoneStr(item.customercontact)}}</span>
                    </div>
                    <div>
                      <span></span><span>{{item.customeraddr|customeraddr }}</span>
                    </div>
                  </div>
                </div>
                <div class="list1-tag" >

                  <template v-if="item.producttag[0].length>=1">
              <span v-for="(item1,index1) in item.producttag[0]" :key="index1" v-if="index1<4">
                <template v-if="item1">
                    {{item1.tagname}}
                </template>

              </span>
                  </template>
                  <template v-else>
                    <span style="border-color:#fff ">...</span>
                  </template>
                </div>
                <div class="list-user clearFix" v-if="showUser">
                  <el-col :span="12">
                    <div class="grid-left bg-purple userbox">
                      <div class="userimg">
                        <img :src="item.userimg" alt="" onerror="this.src='./static/img/head05.png'">
                      </div>
                      <div class="username">{{ item.username }}</div>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple cart">
                      {{ item.salsecount }}
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple view">
                      {{ item.viewcount }}
                    </div>
                  </el-col>
                </div>

              </div>

            </div>

          </template>
          <template v-else>
            <div style="height: 100px;line-height: 100px; width: 100%;text-align: center;font-size: 20px">
              {{ lodingstr }}
            </div>
          </template>
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

      <share v-if="dialogFormVisible" :username="username" :url="url" :downloadButton="downloadButton" @diaclose="diaclose"></share>
    </div>
</template>

<script>
  import share from './common/share'
    export default {
      components:{
        share
      },
      name: "MyProjectIndex",
      data(){
        return {
          tagsList:[],
          productList:{list:[]},
          tags:[],
          postTags:[],
          showUser:false,
          orderByField:'id',
          prostatus:1,
          lodingstr:'加载中...',
          username:'',
          url:'',
          downloadButton: false,
          dialogFormVisible:false,
          listLoading:false
        }
      },
      methods:{
        diaclose(){
          this.dialogFormVisible=false
          this.url=""
        },
        phoneStr(str){
          if(str){
            let str2 = str.substr(0,3)+"****"+str.substr(7);
            return str2;
          }

        },
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
          let routeData=this.$router.resolve({path:'/indexWrap/myProject',query:{productId:val}})
          window.open(routeData.href, '_blank');
        },
        change(val){
          const that = this;
          //获取方案列表
          that.lodingstr="加载中..."
          that.listLoading=true
          that.productList.list=[]
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
            that.listLoading=false
            if(that.productList.list.length<=0){
              that.lodingstr="还没有相应的方案"
            }
          })
        },
        share(id){
          /*生成二维码*/
          let url=this.$api.mobileUrl+"?id="+id
          this.url=url
          this.dialogFormVisible=true
          // console.log(this.config.value)
        },
        prostatu(val){
          this.prostatus=val
          this.change(1)
        },
        replaImg(index,img){
          $('.bigimg_'+index).attr('src',img);
        },
        /*提交方案重新审核*/
        updateProstatus(index){
          let that=this

          let id=that.productList.list[index].id

          this.$api.axiosPost('/product/updateStatus',1,{proid:id},function (res) {
              that.$message.success('提交成功');
              that.productList.list.splice(index,1)
          })
        }
      },
      filters:{
        customeraddr:function(val){
          if(val){
            if(val.length>=7){
              return val.substr(0,7)+'...'
            }else{
              return val
            }
          }
          return ''
        }
      },

      watch:{
        $route:function (val) {
          let status=val.query.prostatus
          this.prostatus=status
          this.change(1)
        }
      },
      mounted(){
        let that = this;
        let prostatus = this.$route.query.prostatus;
        this.prostatus=prostatus
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
  .list1{
    cursor:pointer;
  }
</style>
<style lang="scss" scoped>
  @import "../../static/sass/public";
</style>
