<template>
    <div id="shareProject">
      <div class="mp-top clearFix">
        <div class="top-left">
          <div class="bigImg">
            <img src="" alt="" ref="bigImg">
          </div>
          <div id="swiper1" class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in imgInfo" :key="index" @click="check(item.img)">
                <img :src="item.img" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="top-right">
          <div class="tright-1">
            <span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span>
          </div>
          <div class="tright-2">
            <span>
              <span></span>
              <span>{{productInfo.productionmark}}积分</span>
            </span>
            <span>
              <span></span>
              <span>{{productInfo.salsecount}}</span>
            </span>
            <span>
              <span></span>
              <span>浏览</span>
            </span>
            <span>
              <span></span>
              <span>收藏</span>
            </span>
          </div>
          <div class="tright-3">
            <span></span><span>{{productInfo.customername}}</span>
            <span></span><span>{{productInfo.customercontact}}</span>
            <span></span><span>{{productInfo.customeraddr}}</span>
          </div>
          <div class="tright-4">
            <span v-for="(item,index) in productInfo.producttag" :key="index" v-if="index<4">{{item.tagname}}</span>
          </div>
          <div class="tright-5">
            <div>需求描述</div>
            <div>
              <p>{{productInfo.productdesc}}</p>
            </div>
          </div>
          <div class="tright-6">
            <div>
              <img src="../../static/img/head01.png" alt="">
              <span>彭于晏</span>
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
            <li v-for="(item,index) in navBtns" :class="{sel:item.ok}" @click="navBtn(index,item.component)">{{item.text}}</li>
          </ul>
        </div>
        <div>
          <detail :is="detail" :shareSpaceInfo="shareSpaceInfo"></detail>
        </div>
      </div>
      <div class="duihuan" v-if="tan1">
        <div class="wrap">
          <div class="biankuang">
            <div class="cont1-title">
              <span>{{title}}</span><span @click="closetan"></span>
            </div>
            <div class="cont1" v-if="duihuan">
              <div class="listWrap">
                <div class="list">
                  <div><img src="../../static/img/img16.png" alt=""></div>
                  <div>
                    <div><span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span></div>
                    <div><span>{{productInfo.productionmark}}积分</span></div>
                    <div>
                      <div><span></span><span>{{productInfo.customername}}</span></div>
                      <div><span></span><span>{{productInfo.customercontact}}</span></div>
                      <div><span></span><span>{{productInfo.customeraddr}}</span></div>
                    </div>
                    <div>
                      <span v-for="(item,index) in productInfo.producttag" :key="index" v-if="index<4">{{item.tagname}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div><span>本次消耗：</span><span>{{productInfo.productionmark}}积分</span></div>
                <div><span>当前积分余额：</span><span>{{JSON.parse(userInfo).data.score}}积分</span></div>
              </div>
              <div>
                <div>
                  <textarea placeholder="用户备注" id="textarea1"></textarea>
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
                <div>消耗50积分</div>
              </div>
              <div>
                <div>恭喜您，已经获得的</div>
                <div><span>广州天河</span><span>恒大御府</span><span>02户型</span><span>78m²</span></div>
              </div>
              <div><button @click="closetan">完成</button></div>
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
          text1:"立即兑换",
          detail:ShareSpace,
          navBtns:[
            {text:"空间详情",ok:true,component:ShareSpace},
            {text:"兑换详情",ok:false,component:ShareConvert},
            {text:"分享家用户评论",ok:false,component:ShareComment}
          ],
          tan1:false,
          //弹窗
          duihuan:true,
          suc:false,
          suc1:false,
          userInfo:localStorage.getItem('user-info'),
          title:"您即将获得",
          enought:true,
          sucduihuan:true,
          productInfo:{},
          shareSpaceInfo:[],
          imgInfo:[]
        }
      },
      methods:{
        navBtn(index,component){
          $(event.target).addClass('sel');
          $(event.target).siblings('li').removeClass('sel')
          this.$data.detail = component
        },
        sucbtn(val){
          var userScore = JSON.parse(localStorage.getItem('user-info')).data.score
          if(val<userScore){
            this.duihuan = false;
            this.title = "";
            this.suc = true;
            let userAccount = JSON.parse(localStorage.getItem('user-info')).data.account;
            let desId = this.productInfo.desid;
            const that = this;
            this.$api.axiosPost('/product/exchangeProduct',0,{
              userAccount:userAccount,
              desId:'3FO4IH6X46RN'
            },function (res) {
              console.log(res)
            })
          }else {
            this.suc1 = true;
            this.duihuan = false;
            this.title = "";
          }
        },
        lijiduihuan(){
          $('body').css({
            overflow:'hidden'
          })
          this.tan1 = true
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
        },
        check(val){
          var bigImg = this.$refs.bigImg
          $(bigImg).attr({
            src:val
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
          freeMode: true
        })
      },
      mounted(){
        var productId = this.$router.history.current.query.productId
        const that = this;
        this.$api.axiosGet('/product/productDetail',{
          productId:productId
        },function (res) {
          console.log(JSON.parse(res.data.productInfo))
          that.productInfo = JSON.parse(res.data.productInfo)
          var userId = JSON.parse(localStorage.getItem('user-info')).data.userid
          var res1 = JSON.parse(res.data.productInfo)
          if(res1.userid==userId){
            that.text1 = '无需兑换'
            var btn = that.$refs.duihuanbtn
            $(btn).attr('disabled',true)
          }
          console.log(res1)
          var desid = res1.desid;
          var st = res1.createtime;
          that.$api.axiosGet('/render/synchro',{
            designId:desid,
            // startTime:st,
            start:0,
            num:10
          },function (res){
            console.log(res)
            that.imgInfo = res.data.renders
            that.shareSpaceInfo = res.data.renders
            var bigImg = that.$refs.bigImg
            $(bigImg).attr({
              src:res.data.renders[0].img
            })
            console.log(that.imgInfo)
            // console.log(JSON.parse(res.data.productInfo))
          })
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareProject";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
