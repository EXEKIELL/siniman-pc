<template>
    <div id="shareProject">
      <div class="mp-top clearFix">
        <div class="top-left">
          <div class="bigImg" style="display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;justify-content: center;-webkit-justify-content: center">
            <img style="width: initial;max-height: 100%;max-width: 100%;" :src="productInfo.simg" alt="" ref="bigImg">
          </div>
          <div class="small">
            <div id="swiper1" class="swiper-container">
              <div class="swiper-wrapper">

                <div v-if="imgInfo.length >= 1"
                     style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;"
                     class="swiper-slide"  v-for="(item,index) in imgInfo" :key="index" @mouseenter="check(item.img)"
                >
                  <img :src="item.img" alt="">
                </div>
              </div>
            </div>
            <div class="swiper-button-prev prev01"></div>
            <div class="swiper-button-next next01"></div>
          </div>
        </div>
        <div class="top-right">
          <div class="tright-1">
            <span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span>
          </div>

          <div class="tright-4">
            <span v-for="(item,index) in productInfo.producttag[0]" :key="index">
              <template v-if="item">
                   {{item.tagname}}
              </template>

            </span>
            <span>{{productInfo.area}}m²</span>
          </div>

          <div class="tright-3" style="margin-right: 0" v-if="productInfo.customername != ''">
            <span></span><span>{{productInfo.customername}}</span>
            <span></span><span>{{ phoneStr(productInfo.customercontact) }}</span>
            <span></span><span>{{productInfo.customeraddr}}</span>
          </div>
          <div class="tright-2">
            <span class="price">
              <span style=""></span>
              <span></span>
              <span style="color: red;font-size: 16px;">

                {{productInfo.productionmark}}积分
                &nbsp;&nbsp;
                <span v-if="productInfo.totalPrice" class="totalPrice" style="color: #ff0101;font-size: 14px;">
                  <span style="font-size: 14px;color: #888888;background: none"> 装修总格 :</span>

                  {{ productInfo.totalPrice+'元' }}</span>

              </span>
            </span>
          </div>

          <div class="tright-5">
            <div>需求描述</div>
            <div>
              <p>{{productInfo.productdesc}}</p>
            </div>
          </div>
          <div class="tright-6">
            <div>
              <div style="width: 40px;height: 40px;border-radius:50%;overflow: hidden;margin-right: 10px;">
                <img style="width: 100%;height: 100%;" :src="productInfo.userimg" onerror="this.src='../../static/img/head05.png'" alt="">
              </div>
              <span>{{productInfo.username}}</span>
              <div class="tright-2 shouc">
                <span style="display: none"></span>
                <span style="display: none">
              <span></span>
              <span>{{productInfo.salsecount}}</span>
            </span>
                <span style="display: none">
              <span></span>
              <span>{{ productInfo.viewcount }}</span>
            </span>
                <span :class="{colle:productInfo.hascollect}" @click="collect()">
              <span></span>
              <span>收藏</span>
            </span>
              </div>
            </div>
            <div>
              <button @click="lijiduihuan" ref="duihuanbtn">{{text1}}</button>
            </div>
          </div>
        </div>
      </div>
      <div class="mp-cont">
        <div class="nav">
          <ul>
            <li v-for="(item,index) in navBtns" :class="{sel:navIndex===index}" @click="navBtn(index,item.component)">{{item.text}}</li>
          </ul>
        </div>
        <div>
          <detail :is="detail" :shareSpaceInfo="shareSpaceInfo"></detail>
        </div>
      </div>
      <div class="duihuan" v-if="tan1" v-loading.body="listLoading">
        <div class="wrap">
          <div class="biankuang">
            <div class="cont1-title">
              <span>{{title}}</span><span @click="closetan"></span>
            </div>
            <div class="cont1" v-if="duihuan">
              <div class="listWrap">
                <div class="list">
                  <div>
                    <template v-if="imgInfo[0]">
                      <img :src="imgInfo[0].img" onerror="'../../static/img/img16.png'" alt="">
                    </template>
                    <template v-else>
                      <img :src="productInfo.simg" onerror="'../../static/img/img16.png'" alt="">
                    </template>
                  </div>
                  <div>
                    <div><span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span></div>
                    <div><span>{{productInfo.productionmark}}积分</span></div>
                    <div>
                      <div><span></span><span>{{productInfo.customername}}</span></div>
                      <div><span></span><span>{{ phoneStr(productInfo.customercontact) }}</span></div>
                      <div><span></span><span>{{productInfo.customeraddr}}</span></div>
                    </div>
                    <div>
                      <span v-for="(item,index) in productInfo.producttag[0]" :key="index">
                        <template v-if="item">{{item.tagname}}</template>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div><span>本次消耗：</span><span>{{productInfo.productionmark}}积分</span></div>
                <div><span>当前积分余额：</span><span>{{JSON.parse(userInfo).score}}积分</span></div>
              </div>
              <div>
                <div>
                  <textarea placeholder="兑换留言" id="textarea1" v-model="beizhu"></textarea>
                </div>
              </div>
              <div>
                <button @click="sucbtn(productInfo.productionmark)">确认兑换</button>
              </div>
            </div>
            <div class="cont2" v-if="suc1">
              <div>
                <div><img src="../../static/img/icon67.png" alt=""></div>
                <div></div>
              </div>
              <div>
                <div>兑换失败，积分不足！</div>
                <div><span></span><span></span><span></span><span></span></div>
              </div>
              <div><button @click="closetan">关闭</button></div>
            </div>
            <div class="cont2" v-if="suc">
              <div>
                <div><img src="../../static/img/icon29.png" alt=""></div>
                <div>消耗{{productInfo.productionmark}}积分</div>
              </div>
              <div>
                <div>恭喜您，已经获得的</div>
                <div>
                  <span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span>
                </div>
              </div>
              <div><button @click="closetan">完成·查看已下载方案</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import ShareSpace from './shareSpace'
  import ShareConvert from './shareConvert'
  import ShareComment from './shareComment'
    export default {
      name: "ShareProject",
      data(){
        return {
          text1:"积分下载",
          detail:ShareSpace,
          score:null,
          beizhu:'',
          navBtns:[
            {text:"空间详情",ok:true,component:ShareSpace},
            {text:"兑换详情",ok:false,component:ShareConvert},
            {text:"分享家用户评论",ok:false,component:ShareComment}
          ],
          tan1:false,
          //弹窗
          duihuan:false,
          suc:false,
          suc1:false,
          userInfo:'',
          title:"您即将获得",
          enought:true,
          sucduihuan:true,
          productInfo:{producttag:[]},
          shareSpaceInfo:[],
          imgInfo:[],
          scoreUserId:null,
          userId:null,
          clientId:'',
          navIndex:0,
          ordercount:0,
          listLoading:false
        }
      },

      methods:{
        phoneStr(str){
          if(str){
            let str2 = str.substr(0,3)+"****"+str.substr(7);
            return str2;
          }

        },
        navBtn(index,component){

          this.$data.detail = component;
          this.navIndex=index
          const that = this;
          if(component.name == "ShareConvert"){

          }
        },
        sucbtn(val){
          this.listLoading=true
          let user =JSON.parse(this.userInfo)
          let userScore =user.score
          let that=this
          if(val<=userScore){

            let userAccount = user.account;
            let desId = this.productInfo.desid+''
            const that = this
            //复制酷乐家接口
            this.$api.axiosPost('/product/exchangeProduct',1,{
              userAccount:userAccount,
              desId:desId,
              beizhu:that.beizhu
            },function (res) {

              that.duihuan = false;
              that.title = ""
              that.suc = true
              that.listLoading=false
            })
          }else {
            that.suc1 = true;
            that.duihuan = false;
            that.title = "";
            that.listLoading=false
          }

        },
        lijiduihuan(){
          // $('body').css({
          //   overflow:'hidden'
          // });
          let userinfo=JSON.parse(localStorage.getItem('user-info'))
          if(userinfo.userid==this.productInfo.userid){
            this.$message.error('不能兑换自己的方案')
            return false
          }
          if(this.ordercount>0){
            this.$confirm('您已经兑换过这个方案了，是否继续？','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(()=>{
              this.tan1 = true
              this.duihuan = true
            }).catch(()=>{})
          }else{
            this.tan1 = true
            this.duihuan = true
          }

        },
        closetan(){
          $('body').css({
            overflow:'initial'
          })
          this.tan1 = false
          if(this.enought==true){
            this.duihuan = true;
            this.title = "您即将获得";
            this.suc = false;
            this.suc1 = false;
          }
          let routeData=this.$router.resolve({path:'/indexWrap/myDownload',query:{prostatus:-2}})
          window.open(routeData.href, '_blank');

        },
        check(val){
          var bigImg = this.$refs.bigImg
          $(bigImg).attr({
            src:val
          })
        },
        collect(){
          let that=this
          let proid=that.productInfo.id
          let hascollect=that.productInfo.hascollect
          this.$api.axiosPost('/product/collect',1,{
            product_id:proid
          },function(res){
            if(hascollect==true){
              that.productInfo.hascollect=false
            }else{
              that.productInfo.hascollect=true
            }
          })
        }
      },
      watch:{
      },
      updated(){
        var swiper1 = new Swiper('#swiper1',{
          pagination: '.swiper-pagination',
          slidesPerView: 4,
          paginationClickable: true,
          spaceBetween: 20,
          freeMode: true,
          prevButton:'.prev01',
          nextButton:'.next01'
        })
      },
      mounted(){
        let productId = this.$router.history.current.query.productId;
        let that = this;
        that.userInfo=localStorage.getItem('user-info')

        //方案详情
        this.$api.axiosPost('/product/productDetail',1,{
          productId:productId
        },function (res) {
          that.productInfo = JSON.parse(res.data.productInfo);
          //编辑信息赋值
          that.ordercount=res.data.ordercount
          let res1 = JSON.parse(res.data.productInfo);
          let desid = res1.desid
          let st = res1.createtime

          //获取渲染图
          that.$api.axiosPost('/render/synchro',1,{
            designId:desid,
            start:0,
            num:10
          },function (res){
            that.imgInfo = res.data.renders;
            that.shareSpaceInfo = res.data.renders;

            that.shareSpaceInfo.unshift({img:that.productInfo.simg,description:false})
          })
        })


      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareProject";
  .totalPrice{
    font-size: 16px;
    color: #888;
    background: none !important;
  }
  .shouc{
    position: relative;
    left: 40px;

  }
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
