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
                  <textarea placeholder="用户备注" id="textarea1" v-model="beizhu"></textarea>
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
          score:null,
          beizhu:'',
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
          imgInfo:[],
          scoreUserId:null,
          userId:null,
          clientId:''
        }
      },
      methods:{
        navBtn(index,component){
          $(event.target).addClass('sel');
          $(event.target).siblings('li').removeClass('sel')
          this.$data.detail = component
          console.log(component)
          const userId = this.$store.state.login.userId;
          const productId = this.$router.history.current.query.productId;
          const that = this
          if(component.name == "ShareConvert"){

          }
        },
        sucbtn(val){
          var userScore = JSON.parse(localStorage.getItem('user-info')).data.score
          console.log(userScore)
          if(val<userScore){
            this.duihuan = false;
            this.title = "";
            this.suc = true;
            let userAccount = JSON.parse(localStorage.getItem('user-info')).data.account;
            let desId = this.productInfo.desid+'';
            const that = this;
            //复制酷乐家接口
            this.$api.axiosPost('/product/exchangeProduct'+that.$store.state.login.str1,0,{
              userAccount:userAccount,
              desId:desId
            },function (res) {
              console.log(res)
              var userName = JSON.parse(localStorage.getItem('user-info')).data.username
              var productName = that.productInfo.productname
              var client = that.productInfo.customername
              const token = JSON.parse(localStorage.getItem('user-data')).token
              if(res.data.successCounts&&res.data.successCounts == 1){
              //  增加兑换用户积分
                that.$api.axiosPost('/person/addUserScoreRecord'+that.$store.state.login.str1,1,{
                  scroeUserId:109740,//that.scoreUserId,
                  clientId:2785609,//that.clientId,
                  score:10,//that.productInfo.productionmark,
                  action:'兑换',
                  description:'aaa',//'方案获得用户'+userName+'兑换[方案:'+productName+',客户:'+client+']'
                  token:token,
                  userId:'109740'
                },function (res) {
                  console.log(res)
                })
              }else{
                this.$message.error('兑换失败');
              }
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
        console.log(1111)
        var productId = this.$router.history.current.query.productId;
        var userId = JSON.parse(localStorage.getItem('user-info')).data.userid;
        let token = JSON.parse(localStorage.getItem('user-data')).token;
        const that = this;
        this.userId = userId;
        //方案详情获取
        this.$api.axiosGet('/product/productDetail'+that.$store.state.login.str1,{
          productId:productId
        },function (res) {
          console.log(res)
          console.log('方案详情获取',JSON.parse(res.data.productInfo))
          console.log(JSON.parse(res.data.productInfo));
          that.productInfo = JSON.parse(res.data.productInfo);
          that.clientId = JSON.parse(res.data.productInfo).customerid
          var res1 = JSON.parse(res.data.productInfo);
          console.log(userId,res1.userid);
          that.scoreUserId = res1.userid;

          //判定是否能兑换

          // if(res1.userid == userId){
          //   that.text1 = '无需兑换';
          //   var btn = that.$refs.duihuanbtn;
          //   $(btn).attr('disabled',true)
          // }
          console.log(res1)
          var desid = res1.desid;
          var st = res1.createtime;
          //渲染图获取
          that.$api.axiosGet('/render/synchro'+that.$store.state.login.str1,{
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
      //用户积分查询
        this.$api.axiosPost('/person/getUserScore'+that.$store.state.login.str1,1,{
          token:token,
          userId:userId+''
        },function (res) {
          console.log(res)
          that.score = res.data.attributes.score
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
