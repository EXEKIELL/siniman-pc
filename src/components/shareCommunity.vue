<template>
  <div id="shareCommunity">
    <div class="wrap1">
      <div id="swiper1" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <router-link to="#">
              <img :src="item.imgurl" alt="">
            </router-link>
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
      <div class="w3-seek">
        <div>
          <div>排序：</div>
          <div>
            <ul class="orderby">
              <li class="sel"  @click="paixu1('默认')" >默认</li>
              <li v-for="(item,index) in paixus"  :class="{sel:item.isSel}" :key="index" @click="paixu1(item.text,index)">{{item.text}}</li>
            </ul>
          </div>
          <div>
            <input type="text" v-model="scoreStart" value="0" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
            <span>~</span>
            <input value="1000" v-model="scoreEnd" type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
          </div>
        </div>
        <div>
          <input type="text" placeholder="请输入方案名称" v-model="productName">
          <button @click="getproductList(1)">搜索</button>
        </div>
      </div>
      <div class="w3-nav">
        <ul>
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
        <div class="list1" v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">
          <div class="list1-img">
            <img :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span><span>{{item.area}}m²</span></div>
            <div class="price clearFix">
              <div>{{ item.productionmark }}积分</div>
              <div class="totalPrice" v-if="item.totalPrice">&nbsp;&nbsp;装修价格：¥{{ item.totalPrice }}</div>
            </div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>{{item.customername}}</span>
              </div>
              <div>
                <span></span><span>{{item.customercontact}}</span>
              </div>
              <div>
                <span></span><span>{{item.customeraddr|customeraddr }}</span>
              </div>
            </div>
          </div>
          <div class="list1-tag" >
            <template v-if="item.producttag[0].length>=1">
              <span v-for="(item1,index1) in item.producttag[0]" :key="index1" v-if="index1<4">{{item1.tagname}}</span>
            </template>
            <template v-else>
              <span style="border-color:#fff ">...</span>
            </template>
          </div>
          <div class="list-user">
            <el-col :span="12">
              <div class="grid-left bg-purple userbox">
                <div class="userimg">
                  <img :src="item.userimg" alt="" onerror="'../../static/img/head05.png'">
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
  </div>
</template>

<script>
    export default {
      name: "ShareCommunity",
      data(){
        return {
          postData:{},
          swiperList:[],
          tagsList:[],
          paixus:[
            {text:"积分",type:"",isSel:false},
            {text:"销量",isSel:false},
            {text:"点赞量",isSel:false},
            {text:"收藏量",isSel:false}
          ],
          totalPage:0,
          listData:[],
          tags:[],
          banner:[],
          orderByField:'salsecount',
          postTags:[],
          scoreStart:0,
          scoreEnd:1000,
          productName:null
        }
      },
      methods:{
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
        paixu1(val,index){
          if(val != '默认'){
            $('.orderby li').eq(0).removeClass("sel")

            for (let i =0;i<this.paixus.length;i++){
              if(i==index){
                this.paixus[index].isSel = true;
              }else{
                this.paixus[i].isSel=false
              }
            }
            if(index == 0){
              this.orderByField = 'productionmark'
            }else if(index == 1){
              this.orderByField = 'salsecount'
            }else if(index == 2){
              this.orderByField = 'goodcount'
            }else{
              this.orderByField = 'favoritecount'
            }
          }else{
            this.orderByField = 'salsecount'
            for (let i =0;i<this.paixus.length;i++){
              this.paixus[i].isSel=false
            }

            $('.orderby li').eq(0).addClass("sel")
          }
          this.getproductList(1)
        },
        toUrl(val){

          this.$router.push({path:'/indexWrap/shareProject',query:{productId:val}})
        },

        getproductList(page){
          const that = this;
          // //获取方案列表
          this.$api.axiosPost('/product/productAll',1,{
            data:{
              orderByCondition:'DESC',
              orderByField:that.orderByField,
              tags:that.postTags,
              scoreStart:that.scoreStart,
              scoreEnd:that.scoreEnd,
              productname:that.productName,
            },
            page:{
              pageNum:page,
              pageSize:9
            }
          },function (res) {

            let data = res.data.data;
            that.postData = data;

          })
        },

      },
      filters:{
        customeraddr:function(val){
          if(val.length>=7){
            return val.substr(0,7)+'...'
          }else{
            return val
          }
        }
      },
      mounted(){
        var swiper1 = new Swiper('#swiper1',{
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop:true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next'
        });
        const that = this;
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
            pageNum:1,
            pageSize:1
          }
        },function (res) {
          that.swiperList = res.data.data
        })


      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareCommunity";
.totalPrice{
  font-size: 14px !important;
  color: #888 !important;
  background: none !important;
}
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
