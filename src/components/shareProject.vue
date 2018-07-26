<template>
    <div id="shareProject">
      <div class="mp-top clearFix">
        <div class="top-left">
          <div class="bigImg" style="display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;justify-content: center;-webkit-justify-content: center">
            <img v-if="imgInfo.length>=1" :src="imgInfo[0].img" alt="" ref="bigImg">
            <img style="width: initial;max-height: 100%;max-width: 100%;" v-else :src="productInfo.simg" alt="">
          </div>
          <div id="swiper1" class="swiper-container">
            <div class="swiper-wrapper">
              <div v-if="imgInfo.length == 0" class="swiper-slide">
                <img :src="productInfo.simg" alt="">
              </div>
              <div v-else style="display: flex;align-items: center;display: -webkit-flex;-webkit-align-items: center;" class="swiper-slide"  v-for="(item,index) in imgInfo" :key="index" @click="check(item.img)">
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
            <span class="price">
              <span style="display: none"></span>
              <span></span>
              <span style="color: red">
                {{productInfo.productionmark}}积分
                &nbsp;&nbsp;
                <span class="totalPrice">装修价格 ¥{{ productInfo.totalPrice }}</span>

              </span>
            </span>
          </div>
          <div class="tright-2">
            <span style="display: none"></span>
            <span>
              <span></span>
              <span>{{productInfo.salsecount}}</span>
            </span>
            <span>
              <span></span>
              <span>{{ productInfo.viewcount }}</span>
            </span>
            <span :class="{colle:productInfo.hascollect}" @click="collect()">
              <span></span>
              <span>收藏</span>
            </span>
          </div>

          <div class="tright-3" style="margin-right: 0" v-if="productInfo.customername != ''">
            <span></span><span>{{productInfo.customername}}</span>
            <span></span><span>{{ phoneStr(productInfo.customercontact) }}</span>
            <span></span><span>{{productInfo.customeraddr}}</span>
          </div>
          <div class="tright-4">
            <span v-for="(item,index) in productInfo.producttag[0]" :key="index">{{item.tagname}}</span>
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
                <img style="width: 100%;height: 100%;" :src="productInfo.userimg" onerror="'../../static/img/head05.png'" alt="">
              </div>
              <span>{{productInfo.username}}</span>
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
      <div class="duihuan" v-if="tan1">
        <div class="wrap">
          <div class="biankuang">
            <div class="cont1-title">
              <span>{{title}}</span><span @click="closetan"></span>
            </div>
            <div class="cont1" v-if="duihuan">
              <div class="listWrap">
                <div class="list">
                  <div><img :src="imgInfo[0].img" onerror="'../../static/img/img16.png'" alt=""></div>
                  <div>
                    <div><span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span></div>
                    <div><span>{{productInfo.productionmark}}积分</span></div>
                    <div>
                      <div><span></span><span>{{productInfo.customername}}</span></div>
                      <div><span></span><span>{{ phoneStr(productInfo.customercontact) }}</span></div>
                      <div><span></span><span>{{productInfo.customeraddr}}</span></div>
                    </div>
                    <div>
                      <span v-for="(item,index) in productInfo.producttag[0]" :key="index">{{item.tagname}}</span>
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

            })
          }else {
            that.suc1 = true;
            that.duihuan = false;
            that.title = "";
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
          freeMode: true
        })
      },
      mounted(){
        var productId = this.$router.history.current.query.productId;

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
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
