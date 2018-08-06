<template>
  <div id="myProject" v-loading.body="listLoading">
    <div class="mp-top clearFix">
      <div class="top-left">
        <div class="bigImg" style="justify-content: center;-webkit-justify-content: center;">
          <img :src="productInfo.simg" alt="" ref="bigImg">
        </div>
        <div class="small">
          <div id="swiper1" class="swiper-container">
            <div class="swiper-wrapper">

              <div v-if="imgInfo.length>=1" class="swiper-slide min-swiper" v-for="(item,index) in imgInfo" :key="index"
                   @mouseenter="check(item.img,index)">
                <img :src="item.img" alt="">
                <div v-if="item.cover>=0" :class="{'maskSm sel':item.cover===1,'maskSm':item.cover===0}"
                     style="display: none"
                     @click="setCover(item.id,index)">
                  <button>{{ item.cover===1?'封面':'设置封面' }}</button>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev prev01"></div>
          <div class="swiper-button-next next01"></div>
        </div>
      </div>
      <div class="top-right">
        <!--<div class="tright-1">-->
          <!--<span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span>-->
        <!--</div>-->
        <!--<div class="tright-2" v-if="productInfo.customername != '' && productInfo.customername!='&#45;&#45;'">-->
          <!--<template v-if="productInfo.customername">-->
            <!--<span></span><span>{{productInfo.customername}}</span>-->
          <!--</template>-->

          <!--<template v-if="productInfo.customercontact">-->
            <!--<span></span><span>{{productInfo.customercontact}}</span>-->
          <!--</template>-->

          <!--<template v-if="productInfo.customeraddr">-->
            <!--<span></span><span>{{productInfo.customeraddr}}</span>-->
          <!--</template>-->

        <!--</div>-->
        <!--<div class="tright-3">-->
          <!--<span v-for="(item,index) in productInfo.producttag[0]" :key="index" >-->
            <!--<template v-if="item">{{item.tagname}}</template>-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="tright-4" style="height: 173px;overflow: hidden">-->
          <!--<div>需求描述 <span style="font-size: 14px;color: blue;cursor:pointer;" @click="btn1(2)">编辑方案信息</span></div>-->
          <!--<div>-->
            <!--<p>{{productInfo.productdesc}}</p>-->
          <!--</div>-->
        <!--</div>-->
        <div class="tright-1">
          <span>{{productInfo.productname}}</span><span>{{productInfo.housetype}}</span><span>{{productInfo.area}}m²</span>
        </div>

        <div class="tright-4">
            <span v-for="(item,index) in productInfo.producttag[0]" :key="index">
              <template v-if="item">
                   {{item.tagname}}
              </template>

            </span>

        </div>

        <div class="tright-3" style="margin-right: 0" v-if="productInfo.customername != ''">
          <span></span><span>{{productInfo.customername}}</span>
          <span></span><span>{{ phoneStr(productInfo.customercontact) }}</span>
          <span></span><span>{{productInfo.customeraddr?productInfo.customeraddr:'无'}}</span>
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
          <div>需求描述
            <span style="font-size: 14px;color: blue;cursor:pointer;" @click="btn1(2)">编辑方案信息</span>
          </div>
          <div>
            <p>{{productInfo.productdesc}}</p>
          </div>
        </div>
        <div class="tright-7">
          <button @click="btn1(1)"><span></span><span>分享家·赢豪礼</span></button>
          <button @click="toKjl"><span></span><span>编辑方案</span></button>
          <button v-if="productInfo.prostatus==-1" @click="cxtj()" style="background-color: #409eff;margin-left: 18px">
            <span style="display: none"></span>
            <span @click="cxtj" style="color: #fff">重新提交</span>
          </button>
          <button v-if="productInfo.prostatus==-2" @click="cxtj()" style="background-color: #409eff;margin-left: 18px">
            <span style="display: none"></span>
            <span @click="cxtj" style="color: #fff">提交审核</span>
          </button>
        </div>
        <div class="tright-7" v-if="productInfo.prostatus==-1">
          <el-button
            style="background: none;padding: 0;color: #409eff;overflow: hidden;text-align: left;width: 70%;text-overflow:ellipsis;white-space: nowrap;"
            type="text"  @click="bohuiyuany()">
            你的方案被驳回,原因：{{ productInfo.statusdes }}
          </el-button>
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
        <detail :is="detail" :productId="productInfo.id" :projectSpace="projectSpaceList"></detail>
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
                  <div>
                    <div style="margin-left: -10px;">
                      <label style="width: 37%">兑换积分：</label>
                      <input type="number" placeholder="请输入兑换积分" v-model="form1.productionmark">
                    </div>
                  </div>
                </div>
              </div>
              <div class="formItem3">
                <div class="item-title">标签信息</div>

                <div class="item-cont">
                  <div>已选择：</div>
                  <div class="info">
                    <el-select v-model="value5" @remove-tag="seletTag" @change="seletTag" multiple placeholder="请选择标签">
                      <el-option-group
                        v-for="(item,key) in tags"
                        :label="item.cat_name" :key="key">
                        <template v-for="val in item.lists">
                          <template v-if="invalue5(val.id,item.disabled)">
                            <el-option
                              :key="val.id"
                              :label="val.tagname"
                              :value="val.id"
                              :disabled="false"
                            ></el-option>
                          </template>
                          <template v-else>
                            <el-option
                              :key="val.id"
                              :label="val.tagname"
                              :value="val.id"
                              :disabled="item.disabled"
                            ></el-option>
                          </template>

                        </template>

                      </el-option-group>
                    </el-select>
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
                  <img :src="sysconfig.pcprize1.value" alt="">
                  <span style="display: none">50人已获得</span>
                </div>
                <div><span>{{ sysconfig.pcprize1.name }}</span></div>
                <div><span>{{ sysconfig.pcprize1.price }}</span></div>
              </div>
              <div class="list2">
                <div>
                  <img :src="sysconfig.pcprize2.value" alt="">
                  <span style="display: none">50人已获得</span>
                </div>
                <div><span>{{ sysconfig.pcprize2.name }}</span></div>
                <div><span>{{ sysconfig.pcprize2.price }}</span></div>
              </div>
              <div class="list2">
                <div>
                  <img :src="sysconfig.pcprize3.value" alt="">
                  <span style="display: none">50人已获得</span>
                </div>
                <div><span>{{ sysconfig.pcprize3.name }}</span></div>
                <div><span>{{ sysconfig.pcprize3.price }}</span></div>
              </div>
            </div>

            <div>
              <div><span>赢豪礼规则</span></div>
              <div class="activityRules" v-html="sysconfig.activityRules.value">

              </div>
            </div>
            <div><span>声明：在法律允许的范围内本活动最终解释权归诗尼曼所有</span></div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="方案设计工具"  custom-class="editproduct" :visible.sync="dialogFormVisible"  @close="diaclose">
      <div :style="{height:windowHeight,width:windowWidth}">
        <iframe style="width: 100%;height: 100%" :src="kjurl" frameborder="0"></iframe>
      </div>

    </el-dialog>
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
          tags:[],
          navBtns:[
            {text:"空间详情",ok:true,component:ProjectSpace},
            {text:"兑换详情",ok:false,component:ProjectConvert},
            {text:"分享家用户评论",ok:false,component:ProjectComment}
          ],
          navIndex:0,
          add1:'',
          add2:'',
          add3:'',
          bianjiBoxTitle:"",
          form1:{},
          productInfo:{
            producttag:[]
          },
          imgInfo:[],
          projectSpaceList:[],
          value5:[],
          sysconfig:{},
          listLoading:false,
          access_token:'',
          dialogFormVisible:false,
          kjurl:'',
          windowHeight:"",
          windowWidth:''
        }
      },

      methods:{
        diaclose(){
          this.$confirm('新生成的渲染图大约需要5-10分钟的时间同步到分享家哦～','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
          }).catch(()=>{})
        },
        bohuiyuany(){
          let that=this
          this.$confirm(this.productInfo.statusdes,'驳回原因',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{

          }).catch(()=>{})
        },
        cxtj(){
          let that=this
          this.$confirm('是否提交审核?','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            that.$api.axiosPost('/product/updateStatus',1,{proid:that.form1.id},function (res) {
              that.$message.success('提交成功');
              that.getdesc(that.form1.id)
            })
          }).catch(()=>{})
        },

        phoneStr(str){
          if(str){
            let str2 = str.substr(0,3)+"****"+str.substr(7);
            return str2;
          }

        },
        navBtn(index,component){
          this.navIndex=index

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
            /*方案标签设置*/
            let tags=this.tags
            let value5=this.value5
            for (let i=0;i<tags.length;i++){
              let lists=tags[i].lists
              this.tags[i].disabled=false
              for (let y=0;y<lists.length;y++){
                if(value5.indexOf(lists[y].id)>=0){
                  this.tags[i].disabled=true
                }
              }
            }
          }
        },

        bianjiBoxSub(){
          const that = this;
          that.form1.protags=that.value5
          this.$api.axiosPost('/product/update',1,that.form1,function (res) {

            that.$data.bianjiBox = false;

            $('body').css({
              overflow:'initial'
            })

            if(that.productInfo.prostatus==-1){
              that.$confirm('是否提交审核?','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(()=>{
                that.$api.axiosPost('/product/updateStatus',1,{proid:that.form1.id},function (res) {
                  that.$message.success('提交成功');
                  that.getdesc(that.form1.id)
                })

              }).catch((error)=>{
                console.log(error)
              })
            }
            that.getdesc()
          })
        },
        closeBox(){
          this.bianjiBox = false;
          $('body').css({
            overflow:'initial'
          })
        },
        check(val,index){
          var bigImg = this.$refs.bigImg;
          $(bigImg).attr({
            src:val
          })
          this.imgInfo[index].show=1;

        },
        del(val,index){
          this.form1.producttag[0].splice(index,1)
        },
        setCover(id,index){
          let that=this
          that.$api.axiosPost('/render/setcover',1,{
            id:id,
            designId:that.productInfo.desid
          },function(){
            for (let i=0;i<that.imgInfo.length;i++){
              if(index===i){
                that.imgInfo[i].cover=1
              }else{
                that.imgInfo[i].cover=0
              }
            }
          })
        },

        /*是否在选中的数组中*/
        invalue5(id,disabled){
          let value5=this.value5
          if(value5.indexOf(id)>=0){
            return true
          }
          return false
        },
        /*选中改变事件*/
        seletTag(){
          /*方案标签设置*/
          let tags=this.tags
          let value5=this.value5
          for (let i=0;i<tags.length;i++){
            let lists=tags[i].lists
            this.tags[i].disabled=false
            for (let y=0;y<lists.length;y++){
              if(value5.indexOf(lists[y].id)>=0){
                this.tags[i].disabled=true
              }
            }
          }
        },
        /*获取方案详情*/
        getdesc(id){
          let productId = this.$router.history.current.query.productId;
          const that = this;
          //方案详情
          this.listLoading=true
          this.$api.axiosPost('/product/productDetail',1,{
            productId:productId
          },function (res) {
            that.productInfo = JSON.parse(res.data.productInfo);
            //编辑信息赋值
            that.form1 = JSON.parse(res.data.productInfo);
            if(res.data.access_token){
              that.access_token=res.data.access_token
            }

            var res1 = JSON.parse(res.data.productInfo);
            var desid = res1.desid;
            var st = res1.createtime;
            that.listLoading=false
            let producttag=that.form1.producttag[0]
            that.value5=[]
            for(let i=0;i<producttag.length;i++){
              that.value5.push(producttag[i].id)
            }
            //获取渲染图
            that.$api.axiosPost('/render/synchro',1,{
              designId:desid,
              // startTime:st,
              start:0,
              num:10
            },function (res){

              that.imgInfo = res.data.renders;

              that.projectSpaceList = res.data.renders;
              that.projectSpaceList .unshift({img:that.form1.simg,description:false})
              // var bigImg = that.$refs.bigImg;
              // $(bigImg).attr({
              //   src:res.data.renders[0].img
              // })
              $('.min-swiper').hover(function(){

                $(this).children(".min-swiper").show();
              },function(){
                $(this).children(".min-swiper").hide();
              });

            })
          })
        },
        /**去酷家乐**/
        toKjl(){
          if(this.access_token){
            this.dialogFormVisible=true;
            let that=this
            if(!this.kjurl){
              let url="https://www.kujiale.com/v/auth?accesstoken="+this.access_token+"&dest=1&designid="+this.form1.desid;
              this.kjurl=url;

              if (window.postMessage) {
                var callback = function(ev) {
                  let action=JSON.parse(ev.data)
                  /*发生了保存行为的时候去更新下载状态*/
                  if(action.action=="kjl_saved"){
                    that.$api.axiosPost('/product/editDownload',1,{
                      proid:that.form1.id
                    },function () {

                    })
                  }else if(action.action=="kjl_logout"){
                    this.dialogFormVisible=false;
                    this.$confirm('新生成的渲染图大约需要5-10分钟的时间同步到分享家哦～','提示',{
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(()=>{
                    }).catch(()=>{})
                  }
                };
                if ('addEventListener' in document) {
                  window.addEventListener('message', callback, false);
                } else if ('attachEvent' in document) {
                  window.attachEvent('onmessage', callback);
                }
              } else {
                // 如果不支持postMessage， 则使用ie6/7的window共有属性navigator进行hack
                window.navigator.listenKJL = function(msg) {
                  alert(msg)
                  // var data = JSON.parse(ev.data)
                };
              }
            }
          }else{
            this.$message.warning("状态错误，请刷新页面");
          }
        },
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
        let windowHeight=window.innerHeight
        let windowWidth=window.innerWidth

        this.windowHeight=windowHeight+'px'
        this.windowWidth=windowWidth+'px'
        $('.editproduct').css({"width":this.windowWidth,"height":this.windowHeight})

        let sysconfig=JSON.parse(localStorage.getItem("sysconfig"))
        this.sysconfig=sysconfig

        const that = this;
        that.getdesc()
        that.$api.axiosPost('/tag/getTagList',1,{},function (res) {
          that.tags = res.data.data;

        })
      }
    }
</script>
<style scoped>
  .tagSelect .el-input__inner{
    background: none !important;
  }

</style>
<style lang="scss" scoped>
@import "../../static/sass/myProject";
.tagSelect .el-input__inner{
  background: none !important;
}
.maskSm{
  position: absolute;
  background-color: rgba(0,0,0,0.6);
  color: #fff;
  padding: 3px 5px;
  border-radius: 10px;
}
.maskSm button{
  color: #fff;
  background:none;
}
.min-swiper .sel{
  background-color: rgba(206 ,116 ,129,0.6);
  padding:3px 10px;
}
.min-swiper:hover .maskSm{
  display: block!important;
}
 .activityRules{
   margin-top: 50px;
   margin-bottom: 30px;
   font-size: 14px;
   color: #555555;
   line-height: 25px;
 }

</style>
<style lang="scss">
@import "../../static/sass/public";
.editproduct{
  width: 100%;
  height: 100%;
  margin-top: 0 !important;
}

</style>
