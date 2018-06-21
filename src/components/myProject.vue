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
                    <input type="text" v-model="form1.customeraddr">
                  </div>
                </div>
              </div>
              <div class="formItem2">
                <div class="item-title">方案信息</div>
                <div class="item-cont">
                  <div>
                    <label>方案名称：</label>
                    <input type="text" placeholder="请输入方案名称" v-model="form1.productname">
                  </div>
                  <div>
                    <div>
                      <label style="width: 37%">户型/面积：</label>
                      <input type="text" placeholder="请输入面积" v-model="form1.housetype">
                    </div>
                    <div>
                      <label>面积：</label>
                      <input type="text" placeholder="请输入数字" v-model="form1.area">
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
                    <div v-for="(item,index) in tagsels" :key="index">
                      <label>{{item.catalogname}}：</label>
                      <div>
                        <span v-for="(item3,index3) in item.list" :key="index3">{{item3.tagname}}<span @click="del(item3,index3)"></span></span>
                      </div>
                    </div>
                  </div>
                  <div>请选择：</div>
                  <div class="info">
                    <div v-for="(item,index) in tags" :key="index">
                      <label>{{item.catalogname}}：</label>
                      <div>
                        <span v-for="(item2,index2) in item.list" :key="index2" @click="changeTag(index,index2,item2)">{{item2.tagname}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="formItem4">
                <div class="item-title">需求信息</div>
                <div class="item-cont">
                  <textarea id="" cols="30" rows="10" v-model="form1.productdesc"></textarea>
                </div>
              </div>
              <div class="formItem5">
                <button type="button" @click="bianjiBoxSub">保存</button>
                <button type="button" @click="closeBox">取消</button>
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
          tagsels:[
            {catalogname:'类型：',list:[]},
            {catalogname:'阶段：',list:[]},
            {catalogname:'户型：',list:[]},
            {catalogname:'风格：',list:[]},
          ],
          tags:[],
          navBtns:[
            {text:"空间详情",ok:true,component:ProjectSpace},
            {text:"兑换详情",ok:false,component:ProjectConvert},
            {text:"分享家用户评论",ok:false,component:ProjectComment}
          ],
          add1:'',
          add2:'',
          add3:'',
          bianjiBoxTitle:"",
          form1:{},
          productInfo:[],
          imgInfo:[],
          projectSpace:[]
        }
      },
      methods:{
        navBtn(index,component){
          $(event.target).addClass('sel');
          $(event.target).siblings('li').removeClass('sel');
          this.$data.detail = component
        },
        btn1(index){
          if(index==1){
            $('body').css({
              overflow:'hidden'
            });
            this.$data.fenxiang = true;
            this.$data.bianji = false;
            this.$data.bianjiBoxTitle = "分享家·赢豪礼，最高可得苹果笔记本电脑"
            this.$data.bianjiBox = true
          }else if(index==2){
            $('body').css({
              overflow:'hidden'
            });
            this.$data.bianji = true;
            this.$data.fenxiang = false;
            this.$data.bianjiBoxTitle = "编辑方案信息";
            this.$data.bianjiBox = true
          }
        },
        bianjiBoxSub(){
          this.form1.producttag = this.tagsels;
          const that = this;
          this.$api.axiosPost('/product/update'+that.$store.state.login.str1,1,that.form1,function (res) {
            console.log(res)
            that.$data.bianjiBox = false;
            $('body').css({
              overflow:'initial'
            })
          })
        },
        closeBox(){
          this.bianjiBox = false;
          $('body').css({
            overflow:'initial'
          })
        },
        check(val){
          var bigImg = this.$refs.bigImg;
          $(bigImg).attr({
            src:val
          })
        },
        changeTag(index,index2,val2){
          for(var i = 0;i<this.tagsels.length;i++){
            if(val2.catalogname == this.tagsels[i].catalogname){
              if(this.tagsels[i].list.find(function (val) {
                return val.tagname == val2.tagname
              }) == undefined){
                console.log(this.tagsels[i].list.find(function (val) {
                  return val.tagname == val2.tagname
                }))
                this.tagsels[i].list.push(val2)
              }
            }
          }
          console.log(this.tagsels)
        },
        del(val,index){
          for(var i = 0;i<this.tagsels.length;i++){
            if(val.catalogname == this.tagsels[i].catalogname){
              this.tagsels[i].list.splice(index,1);
              console.log(this.tagsels)
            }
          }
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
        let productId = this.$router.history.current.query.productId;
        const that = this;
        //方案详情
        this.$api.axiosGet('/product/productDetail'+that.$store.state.login.str1,{
          productId:productId
        },function (res) {
          console.log(res);
          console.log(JSON.parse(res.data.productInfo));
          that.productInfo = JSON.parse(res.data.productInfo);
          //编辑信息赋值
          that.form1 = JSON.parse(res.data.productInfo);
          var res1 = JSON.parse(res.data.productInfo);
          console.log(res1);
          var desid = res1.desid;
          var st = res1.createtime;
          //获取渲染图
          that.$api.axiosGet('/render/synchro'+that.$store.state.login.str1,{
            designId:desid,
            // startTime:st,
            start:0,
            num:10
          },function (res){
            console.log(res)
            that.imgInfo = res.data.renders;
            console.log(that.imgInfo);
            that.projectSpace = res.data.renders;
            // console.log(that.projectSpace)
            var bigImg = that.$refs.bigImg;
            $(bigImg).attr({
              src:res.data.renders[0].img
            })
            // console.log(that.imgInfo)
            // console.log(JSON.parse(res.data.productInfo))
            // 获取标签
            let tagsList = that.form1.tags.split(',');
            that.$api.axiosGet('/tag/getTagList'+that.$store.state.login.str1,{},function (res) {
              console.log(res);
              that.tags = res.data;
              for(var i = 0;i<that.tags.length;i++){
                that.tagsels[i].catalogname = that.tags[i].catalogname
              }
            })
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
