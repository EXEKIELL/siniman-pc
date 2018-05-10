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
              <li class="sel"  @click="paixu1('默认')" >默认</li>
              <li :class="{sel:item.isSel}" v-for="(item,index) in paixus" :key="index" @click="paixu1(item.text,index)">{{item.text}}</li>
            </ul>
          </div>
          <div>
            <input type="text" v-model="scoreStart" value="0" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
            <span>~</span>
            <input value="1000" v-model="scoreEnd" type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
          </div>
        </div>
        <div>
          <input type="text" placeholder="请输入设计师姓名或文案名称" v-model="productName">
          <button @click="search">搜索</button>
        </div>
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
        <div class="list1" v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">
          <div class="list1-img">
            <img src="../../static/img/img05.png" alt=""><!--:src="item.simg==''?'../../static/img/img05.png':item.simg"-->
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
        :total="postData.total*10">
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
            {text:"价格",isSel:false},
            {text:"销量",isSel:false},
            {text:"点赞量",isSel:false},
            {text:"收藏量",isSel:false}
          ],
          totalPage:0,
          listData:[],
          tags:[],
          banner:[],
          orderByField:'',
          postTags:[],
          scoreStart:0,
          scoreEnd:1000,
          productName:''
        }
      },
      methods:{
        navSel(val,val1){
          console.log(val,val1)
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
          const userId = this.$store.state.login.userId;
          //标签查询方案库分页查询
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
            that.postData = res.data
            console.log('标签',res)
          })
        },
        paixu1(val,index){
          if(val != '默认'){
            $(event.target).parent('ul').find('li:first-child').removeClass('sel')
            for(var i = 0;i<this.paixus.length;i++){
              this.paixus[i].isSel = false;
            }
            this.paixus[index].isSel = true;

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
            for(var i = 0;i<this.paixus.length;i++){
              this.paixus[i].isSel = false;
            }
            $(event.target).addClass('sel')
            this.orderByField = ''
          }
          const that = this;
          const userId = this.$store.state.login.userId;
          //排序查询分页
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
            that.postData = res.data
            console.log('排序',res)
          })
        },
        toUrl(val){
          console.log(val)
          this.$router.push({path:'/indexWrap/shareProject',query:{productId:val}})
        },
        change(val){
          const that = this;
          const userId = this.$store.state.login.userId;
          //分页查询
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
            that.postData = res.data
            console.log('页码',res)

          })
        },
        search(){
          console.log(parseFloat(this.scoreStart),parseInt(this.scoreEnd),this.productName)
          //搜索分页查询
          const that = this;
          const userId = this.$store.state.login.userId;
          this.$api.axiosPost('/product/productList'+that.$store.state.login.str1,1,{
            data:{
              userids:[userId],
              tags:that.postTags,
              orderByCondition:'DESC',
              orderByField:that.orderByField,
              scoreStart:that.scoreStart,
              scoreEnd:that.scoreEnd,
              productname:that.productName
            },
            page:{
              pageNum:1,
              pageSize:9
            }
          },function (res) {
            that.postData = res.data
            console.log('加载',res)
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
        const userId = this.$store.state.login.userId;
        //标签获取
        this.$api.axiosGet('/tag/getTagList'+that.$store.state.login.str1,{},function (res) {
          console.log(res.data)
          that.tagsList = res.data
        })
        //方案库分页查询
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
          that.postData = res.data
          console.log('加载',res)
        })
        //  banner图获取
        this.$api.axiosPost('/img/getImgListByParam'+that.$store.state.login.str1,1,{
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
