<template>
  <div id="myProject">
    <div class="mp-top clearFix">
      <div class="top-left">
        <div class="bigImg">
          <img src="../../static/img/img08.png" alt="">
        </div>
        <div id="swiper1" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../static/img/img08.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="../../static/img/img08.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="../../static/img/img08.png" alt="">
            </div>
            <div class="swiper-slide">
              <img src="../../static/img/img08.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="top-right">
        <div class="tright-1">
          <span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span>
        </div>
        <div class="tright-2">
          <span></span><span>张若昀</span>
          <span></span><span>15205201520</span>
          <span></span><span>天河区科韵路方圆E时光西座2202</span>
        </div>
        <div class="tright-3">
          <span>全屋方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
        </div>
        <div class="tright-4">
          <div>需求描述</div>
          <div>
            <p>这里是该套餐的内容介绍：该户型比较不规范，转角以及不规则的开关区域较多，导致浪费了较多的空间。业主是比较传统的中国知识女性，在沟通的时候，获希望能装修成新中风格。本套方案，通过对家具、饰品等商品的选材极大的考虑了这个问题，结合一些特殊商品，很好的将本来不能摆放家具的地方，巧妙地摆放了家具。</p>
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
        <detail :is="detail"></detail>
      </div>
    </div>
    <div class="mp-bianjiBox" v-if="bianjiBox">
      <div class="bianjiBoxWrap">
        <div class="biankuang">
          <div class="bianjiBoxTitle">{{bianjiBoxTitle}}<span @click="bianjiBox = false"></span></div>
          <div class="bianji" v-if="bianji">
            <form :model="form1">
              <div class="formItem1">
                <div class="item-title">客户信息</div>
                <div class="item-cont">
                  <div>
                    <label>客户姓名：</label>
                    <input type="text" v-model="form1.name">
                  </div>
                  <div>
                    <label>联系方式：</label>
                    <input type="text" v-model="form1.contact">
                  </div>
                </div>
                <div class="item-cont">
                  <div>
                    <label>客户地址：</label>
                    <div>
                      <el-select v-model="form1.add1" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                      <el-select v-model="form1.add2" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div>
                    <label>详细地址：</label>
                    <input type="text" v-model="form1.add3">
                  </div>
                </div>
              </div>
              <div class="formItem2">
                <div class="item-title">方案信息</div>
                <div class="item-cont">
                  <div>
                    <label>方案名称：</label>
                    <input type="text" v-model="form1.fanganName">
                  </div>
                  <div>
                    <div>
                      <label>类型：</label>
                      <el-select v-model="form1.type" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                    <div>
                      <label>户型/面积：</label>
                      <el-select v-model="form1.area" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </div>
                  <div>
                    <div>
                      <label>面积：</label>
                      <input type="text" placeholder="请输入数字" v-model="form1.area1">
                      <span>m²</span>
                    </div>
                    <div>
                      <label>风格：</label>
                      <el-select v-model="form1.style1" placeholder="请选择">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="formItem3">
                <div class="item-title">需求信息</div>
                <div class="item-cont">
                  <textarea id="" cols="30" rows="10" v-model="form1.message1"></textarea>
                </div>
              </div>
              <div class="formItem4">
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
    <div class="mp-fenxiangBox">
      <div class="fenxiangBoxWrap">
        <div class="biankuang">

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
          bianjiBoxTitle:"",
          form1:{
            name:'',
            contact:'',
            add1:'',
            add2:'',
            add3:'',
            fanganName:'',
            type:'',
            area:'',
            area1:'',
            style1:'',
            message1:''
          }
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
            this.$data.bianji = true
            this.$data.fenxiang = false
            this.$data.bianjiBoxTitle = "编辑方案信息"
            this.$data.bianjiBox = true
          }
        },
        bianjiBoxSub(){
          console.log(this.$data.form1)
          this.$data.bianjiBox = false
        }
      },
      mounted(){
        var swiper1 = new Swiper('#swiper1',{
          pagination: '.swiper-pagination',
          slidesPerView: 4,
          paginationClickable: true,
          spaceBetween: 20,
          freeMode: true
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
