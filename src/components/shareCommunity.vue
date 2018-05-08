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
            <ul>
              <li :class="{sel:item.isSel}" v-for="(item,index) in paixus" :key="index" @click="paixu1(index)">{{item.text}}</li>
            </ul>
          </div>
          <div>
            <input type="text" value="0" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
            <span>~</span>
            <input value="1000" type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
          </div>
        </div>
        <div>
          <input type="text" placeholder="请输入设计师姓名或文案名称">
          <button>搜索</button>
        </div>
      </div>
      <div class="w3-nav">
        <ul>
          <li class="clearFix" v-for="(item,index) in tagsList" :key="index">
            <span class="nav-left">{{item.catalogname+'：'}}</span>
            <div class="nav-right">
              <div>全部</div>
              <div v-for="(item1,index1) in item.list" :key="index1">
                <div @click="navSel" >{{item1.tagname}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w3-cont">
        <div class="list1" v-for="(item,index) in listData" :key="index" @click="toUrl(item.id)">
          <div class="list1-img">
            <img :src="item.simg" alt="">
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
          <div class="list1-tag" >
            <span v-for="(item1,index1) in item.producttag" :key="index1" v-if="index1<4">{{item1.tagname}}</span>
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
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareCommunity",
      data(){
        return {
          swiperList:[],
          tagsList:[],
          paixus:[
            {text:"价格",isSel:true},
            {text:"销量",isSel:false},
            {text:"点赞量",isSel:false},
            {text:"收藏量",isSel:false}
          ],
          listData:[],
          tags:['','','',''],
          banner:[]
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
          const that = this
          //标签查询方案库分页查询
          this.$api.axiosPost('/product/productList',1,{
            data:{
              tags:that.tags,
              orderByCondition:'DESC',
              orderByField:'productionmark'
            },
            page:{
              pageNum:1,
              pageSize:9
            }
          },function (res) {
            that.listData = res.data.data
            console.log(res)
          })
        },
        paixu1(index){
          for(var i = 0;i<this.paixus.length;i++){
            this.paixus[i].isSel = false;
          }
          this.paixus[index].isSel = true;
        },
        toUrl(val){
          console.log(val)
          this.$router.push({path:'/indexWrap/shareProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          //分页查询
          this.$api.axiosPost('/product/productList',1,{
            data:{
              orderByCondition:'DESC',
              orderByField:'productionmark'
            },
            page:{
              pageNum:val,
              pageSize:9
            }
          },function (res) {
            that.listData = res.data.data
            console.log(that.listData)

          })
        }
      },
      filters:{

      },
      mounted(){
        var swiper1 = new Swiper('#swiper1',{
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop:true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next'
        })
        const that = this;
        //标签获取
        this.$api.axiosGet('/tag/getTagList',{},function (res) {
          console.log(res.data)
          that.tagsList = res.data
        })
        //方案库分页查询
        this.$api.axiosPost('/product/productList',1,{
          data:{
            orderByCondition:'DESC',
            orderByField:'productionmark',
            prostatus:1,
            productName:'123'
          },
          page:{
            pageNum:1,
            pageSize:9
          }
        },function (res) {
          that.listData = res.data.data
          console.log(that.listData)
        })
        //  banner图获取
        this.$api.axiosPost('/img/getImgListByParam',1,{
          data:{
            imgType:1
          },
          page:{
            pageNum:0,
            pageSize:10
          }
        },function (res) {
          that.swiperList = res.data.data
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareCommunity";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
