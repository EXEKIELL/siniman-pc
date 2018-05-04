<template>
  <div id="myProject">
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
          <span></span><span>{{productInfo.customername}}</span>
          <span></span><span>{{productInfo.customercontact}}</span>
          <span></span><span>{{productInfo.customeraddr}}</span>
        </div>
        <div class="tright-3">
          <span v-for="(item,index) in productInfo.producttag" :key="index" v-if="index<4">{{item.tagname}}</span>
        </div>
        <div class="tright-4">
          <div>需求描述</div>
          <div>
            <p>{{productInfo.productdesc}}</p>
          </div>
        </div>
        <div class="tright-5">
          <button @click="btn1(1)"><span></span><span>分享家·赢豪礼，最高可得苹果笔记本电脑</span></button>
          <button @click="btn1(2)"><span></span><span>编辑客户信息</span></button>
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
        <detail :is="detail" :projectSpace="projectSpace"></detail>
      </div>
    </div>
    <div class="mp-bianjiBox" v-if="bianjiBox">
      <div class="bianjiBoxWrap">
        <div class="biankuang">
          <div class="bianjiBoxTitle">{{bianjiBoxTitle}}<span @click="closeBox"></span></div>
          <div class="bianji" v-if="bianji">
            <form :model="form1">
              <div class="formItem1">
                <div class="item-title">客户信息</div>
                <div class="item-cont">
                  <div>
                    <label>客户姓名：</label>
                    <input type="text" v-model="form1.customername">
                  </div>
                  <div>
                    <label>联系方式：</label>
                    <input type="text" v-model="form1.customercontact">
                  </div>
                </div>
                <div class="item-cont">
                  <div>
                    <label>客户地址：</label>
                    <div>
                      <el-select v-model="add1" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                      <el-select v-model="add2" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div>
                    <label>详细地址：</label>
                    <input type="text" v-model="add3">
                  </div>
                </div>
              </div>
              <div class="formItem2">
                <div class="item-title">方案信息</div>
                <div class="item-cont">
                  <div>
                    <label>方案名称：</label>
                    <input type="text" placeholder="请输入方案名称" v-model="form1.fanganName">
                  </div>
                  <div>
                    <div>
                      <label style="width: 27%">户型/面积：</label>
                      <input type="text" placeholder="请输入面积" v-model="form1.area">
                    </div>
                    <div>
                      <label>面积：</label>
                      <input type="text" placeholder="请输入数字" v-model="form1.area1">
                      <span>m²</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="formItem3">
                <div class="item-title">标签信息</div>
                <div class="item-cont">
                  <div>已选择：</div>
                  <div class="shou">
                    <div>
                      <label>类型：</label>
                      <div>
                        <span>全屋方案<span></span></span>
                        <span>空间方案<span></span></span>
                      </div>
                    </div>
                    <div>
                      <label>阶段：</label>
                      <div>
                        <span>户型阶段<span></span></span>
                        <span>装修阶段<span></span></span>
                      </div>
                    </div>
                  </div>
                  <div>请选择：</div>
                  <div class="info">
                    <div>
                      <label>类型：</label>
                      <div>
                        <span>全屋方案</span>
                        <span>空间方案</span>
                      </div>
                    </div>
                    <div>
                      <label>阶段：</label>
                      <div>
                        <span>户型阶段</span>
                        <span>装修阶段</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="formItem4">
                <div class="item-title">需求信息</div>
                <div class="item-cont">
                  <textarea id="" cols="30" rows="10" v-model="form1.message1"></textarea>
                </div>
              </div>
              <div class="formItem5">
                <button @click="bianjiBoxSub">保存</button>
                <button @click="bianjiBox = false">取消</button>
              </div>
            </form>
          </div>
          <div class="fenxiang" v-if="fenxiang">
            <div>
              <div class="list2">
                <div>
                  <img src="../../static/img/img13.png" alt="">
                  <span>50人已获得</span>
                </div>
                <div><span>MAC pro 15.4</span></div>
                <div><span>￥10000.00</span></div>
              </div>
              <div class="list2">
                <div>
                  <img src="../../static/img/img14.png" alt="">
                  <span>50人已获得</span>
                </div>
                <div><span>Iphone X</span></div>
                <div><span>￥7000.00</span></div>
              </div>
              <div class="list2">
                <div>
                  <img src="../../static/img/img15.png" alt="">
                  <span>50人已获得</span>
                </div>
                <div><span>七天邮轮</span></div>
                <div><span>￥7790.00</span></div>
              </div>
            </div>
            <div>
              <div>
                <img src="../../static/img/wechai_icon.png" alt="">
                <div>
                  <img src="../../static/img/weixinerweima.png" alt="">
                </div>
              </div>
              <div>
                <img src="../../static/img/weibo_icon.png" alt="">
              </div>
              <div>
                <img src="../../static/img/qq_icon.png" alt="">
              </div>
              <div>
                <img src="../../static/img/qqzone_icon.png" alt="">
              </div>
            </div>
            <div>
              <div><span>赢豪礼规则</span></div>
              <div>
                <ul>
                  <li>01.规则选定，品牌部未确定配套方案。规则选定，品牌部未确定配套方案。</li>
                  <li>01.规则选定，品牌部未确定配套方案。规则选定，品牌部未确定配套方案。</li>
                  <li>01.规则选定，品牌部未确定配套方案。规则选定，品牌部未确定配套方案。</li>
                  <li>01.规则选定，品牌部未确定配套方案。规则选定，品牌部未确定配套方案。</li>
                  <li>01.规则选定，品牌部未确定配套方案。规则选定，品牌部未确定配套方案。</li>
                </ul>
              </div>
            </div>
            <div><span>声明：在法律允许的范围内本活动最终解释权归诗尼曼所有</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectSpace from './projectSpace'
  import ProjectConvert from './projectConvert'
  import ProjectComment from './projectComment'
    export default {
      name: "MyProject",
      data(){
        return {
          detail:ProjectSpace,
          bianjiBox:false,
          bianji:false,
          fenxiang:true,
          navBtns:[
            {text:"空间详情",ok:true,component:ProjectSpace},
            {text:"兑换详情",ok:false,component:ProjectConvert},
            {text:"分享家用户评论",ok:false,component:ProjectComment}
          ],
          add1:'',
          add2:'',
          add3:'',
          bianjiBoxTitle:"",
          form1:{
            customername:'',
            customercontact:'',
            customeraddr:this.add1+this.add2+this.add3,
            productname:'',
            housetype:'',
            area:'',
            area1:'',
            style1:'',
            message1:''
          },
          productInfo:[],
          imgInfo:[],
          projectSpace:[]
        }
      },
      methods:{
        navBtn(index,component){
          $(event.target).addClass('sel');
          $(event.target).siblings('li').removeClass('sel')
          this.$data.detail = component
        },
        btn1(index){
          if(index==1){
            this.$data.fenxiang = true
            this.$data.bianji = false
            this.$data.bianjiBoxTitle = "分享家·赢豪礼，最高可得苹果笔记本电脑"
            this.$data.bianjiBox = true
          }else if(index==2){
            $('body').css({
              overflow:'hidden'
            })
            this.$data.bianji = true
            this.$data.fenxiang = false
            this.$data.bianjiBoxTitle = "编辑方案信息"
            this.$data.bianjiBox = true
          }
        },
        bianjiBoxSub(){
          console.log(this.$data.form1)
          this.$data.bianjiBox = false
          $('body').css({
            overflow:'initial'
          })
        },
        closeBox(){
          this.bianjiBox = false
          $('body').css({
            overflow:'initial'
          })
        },
        check(val){
          var bigImg = this.$refs.bigImg
          $(bigImg).attr({
            src:val
          })
        }
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
        let productId = this.$router.history.current.query.productId
        const that = this;
        this.$api.axiosGet('/product/productDetail',{
          productId:productId
        },function (res) {
          console.log(JSON.parse(res.data.productInfo))
          that.productInfo = JSON.parse(res.data.productInfo)
          var res1 = JSON.parse(res.data.productInfo)
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
            console.log(that.imgInfo)
            that.projectSpace = res.data.renders
            // console.log(that.projectSpace)
            var bigImg = that.$refs.bigImg
            $(bigImg).attr({
              src:res.data.renders[0].img
            })
            // console.log(that.imgInfo)
            // console.log(JSON.parse(res.data.productInfo))
          })
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/myProject";
</style>
<style lang="scss">
@import "../../static/sass/public";
</style>
