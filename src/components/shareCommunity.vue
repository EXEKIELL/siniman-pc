<template>
  <div id="shareCommunity" >
    <div class="wrap1">
      <div id="swiper1" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <template v-if="item.link">
              <a :href="item.link" target="_blank">
                <img :src="item.imgurl" alt="">
              </a>
            </template>
            <template v-else>
              <router-link to="#">
                <img :src="item.imgurl" alt="">
              </router-link>
            </template>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev">
          <img src="../../static/img/btn-left.png" alt="">
        </div>
        <div class="swiper-button-next">
          <img src="../../static/img/btn-right.png" alt="">
        </div>
      </div>
    </div>
    <div class="wrap3">
      <div class="w3-title">
        <span>共享方案</span>
      </div>
      <div class="w3-nav">
        <ul>
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
          <li class="clearFix">
            <span class="nav-left">总价：</span>
            <div class="nav-right">
              <div>
                <div class="sel" @click="priceSel(null,null)">全部</div>
              </div>
              <div><div @click="priceSel(5000,10000)">5000-1万元</div></div>
              <div><div @click="priceSel(10000,30000)">1万-3万元</div></div>
              <div><div @click="priceSel(30000,50000)">3万-5万元</div></div>
              <div><div @click="priceSel(50000,100000)">5万-10万元</div></div>
              <div><div @click="priceSel(100000,null)">10万元以上</div></div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w3-seek">
        <div>
          <div>排序：</div>
          <div>
            <ul class="orderby">
              <li class="sel"  @click="paixu1('默认','','id')" >
                <span class="time"></span> <span>时间</span>
              </li>
              <!--{{item.text}}-->
              <li v-for="(item,index) in paixus"  :class="{sel:item.isSel}" :key="index" @click="paixu1(item.text,index,item.type)">
                <span class="icon" :class="{icon_1:index===1,icon0:index == 0,icon1:index == 2,icon2:index == 3,icon3:index == 4}"></span><span>{{item.text}}</span>
              </li>

            </ul>
          </div>
          <!--<div>-->
            <!--<input type="text" v-model="scoreStart" value="0" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">-->
            <!--<span>~</span>-->
            <!--<input value="1000" v-model="scoreEnd" type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">-->
          <!--</div>-->
        </div>
        <div>
          <input type="text" style="font-size: 14px" placeholder="方案名称/设计师姓名/客户姓名" v-model="productName">
          <button @click="getproductList(1)">搜索</button>
        </div>
      </div>
      <div class="w3-cont" v-loading.body="listLoading">
        <template v-if="postData.list.length>=1">
          <div class="list1" v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">
            <div class="list-user">
              <el-col :span="12">
                <div class="grid-left bg-purple userbox ">
                  <div class="userimg">
                    <img :src="item.userimg" alt="" onerror="this.src='./static/img/head05.png'">
                  </div>
                  <div class="username">{{ item.username }}</div>
                </div>
              </el-col>
            </div>
            <div class="list1-img">
              <div class="img">
                <img :class="'bigimg_'+index" v-if="item.renders.length>=1" :src="item.renders[0].img"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
                <img :class="'bigimg_'+index" v-else :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
              </div>
              <div style="top: -43px;right: 0;   z-index: 200">
                <button style="border: 0;background-color: rgba(255,0,0,0.8);" @click.stop="share(item.id,item.username)">分享到朋友圈</button>
              </div>
              <div v-if="item.renders.length>=1" class="maskSm">
                <div v-for="val in item.renders">
                  <img :src="val.img" @mouseenter="replaImg(index,val.img)" alt="">
                  <div class="maskSm"></div>
                </div>
              </div>
            </div>
            <div class="list1-wrap">
              <div class="list1-cont">
                <div class="price">
                  <div>{{ item.productionmark }}积分</div>
                  <div class="totalPrice" v-if="item.totalPrice">&nbsp;&nbsp;装修价格：¥{{ item.totalPrice }}</div>
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
        @current-change="getproductList"
        :total="postData.last_page*10">
      </el-pagination>
    </div>

    <share v-if="dialogFormVisible" :username="username" :url="url" :downloadButton="downloadButton"  @diaclose="diaclose"></share>
  </div>
</template>

<script>
  import share from './common/share'
    export default {
      components:{share},
      name: "ShareCommunity",
      data(){
        return {
          postData:{list:[]},
          swiperList:[],
          tagsList:[],
          paixus:[
            {text:"总价",isSel:false,type:'totalPrice'},
            {text:"积分",isSel:false,type:'productionmark'},
            {text:"下载量",isSel:false,type:'salsecount'},
            {text:"点赞量",isSel:false,type:'goodcount'},
            {text:"收藏量",isSel:false,type:'favoritecount'}
          ],
          totalPage:0,
          listData:[],
          tags:[],
          banner:[],
          orderByField:'id',
          postTags:[],
          scoreStart:0,
          scoreEnd:1000,
          productName:null,
          listLoading:false,
          showUser:false,
          priceStart:null,
          priceEnd:null,

          downloadButton: false,
          dialogFormVisible:false,
          username:'',
          url:'',
          lodingstr:'加载中...',
          orderByCondition:"DESC",

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
        priceSel(min,max){
          $('.clearFix').find('.nav-right div').on("click",function(){
            $(this).parent().find('div').removeClass("sel")
            $(this).children('div').addClass("sel")
          })
          this.priceStart=min
          this.priceEnd=max
          this.getproductList(1)
        },
        navSel(val,val1){
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
              index1 = this.tags[key];
            this.postTags.push(this.tagsList[index].lists[index1].id)
          }

          const that = this;

          this.getproductList(1)
        },
        paixu1(val,index,type){
          if(val != '默认'){
            $('.orderby li').eq(0).removeClass("sel")

            for (let i =0;i<this.paixus.length;i++){
              if(i==index){
                this.paixus[index].isSel = true;
              }else{
                this.paixus[i].isSel=false
              }
            }

          }else{

            for (let i =0;i<this.paixus.length;i++){
              this.paixus[i].isSel=false
            }

            $('.orderby li').eq(0).addClass("sel")
          }


          if(this.orderByField!=type){
            this.orderByCondition="DESC"

          }else{
            if(this.orderByCondition=="DESC"){
              this.orderByCondition=null
            }else{
              this.orderByCondition="DESC"
            }
          }
          this.orderByField=type


          this.getproductList(1)
        },
        toUrl(val){

          let routeData=this.$router.resolve({path:'/indexWrap/shareProject',query:{productId:val}})
          window.open(routeData.href, '_blank');
        },
        share(id,username){
          /*生成二维码*/
          let url=this.$api.mobileUrl+"?id="+id
          this.url=url
          this.username=username
          this.dialogFormVisible=true
          // console.log(this.config.value)

        },

        getproductList(page){
          const that = this;
          that.listLoading=true
          that.lodingstr="加载中..."
          // //获取方案列表
          that.postData.list=[]
          this.$api.axiosPost('/product/productAll',1,{
            data:{
              orderByCondition:that.orderByCondition,
              orderByField:that.orderByField,
              tags:that.postTags,
              scoreStart:that.scoreStart,
              scoreEnd:that.scoreEnd,
              productname:that.productName,
              priceStart:that.priceStart,
              priceEnd:that.priceEnd,
            },
            page:{
              pageNum:page,
              pageSize:9
            }
          },function (res) {
            that.listLoading=false
            let data = res.data.data;
            that.postData = data;
            if(that.postData.list.length<=0){
              that.lodingstr="还没有相应的方案"
            }
          })
        },
        replaImg(index,img){
          $('.bigimg_'+index).attr('src',img);
        },

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
      mounted(){

        const that = this;
        // this.
        let username=this.$route.query.username;
        if(username){
          this.productName=username
        }
        this.getproductList(1)

        // //标签获取
        this.$api.axiosPost('/tag/getTagList',1,{},function (res) {
          that.tagsList = res.data.data
        })

        //  banner图获取
        this.$api.axiosPost('/img/getImgListByParam',1,{
          data:{
            imgType:1
          },
          page:{
            pageNum:0,
            pageSize:100
          }
        },function (res) {
          that.swiperList = res.data.data
          setTimeout(function () {
            var swiper1 = new Swiper('#swiper1',{
              pagination: '.swiper-pagination',
              paginationClickable: true,
              loop:true,
              prevButton:'.swiper-button-prev',
              nextButton:'.swiper-button-next',
              autoplay : 3000,
            });
          },500)
        })


      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareCommunity";

  .area{
    float: right;
    color: #333333!important;
    font-weight: bold;
  }

</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
