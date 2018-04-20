<template>
    <div id="shareProject">
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
          <div class="tright-2"><span>50积分</span></div>
          <div class="tright-3">
            <span></span><span>张若昀</span>
            <span></span><span>15205201520</span>
            <span></span><span>天河区科韵路方圆E时光西座2202</span>
          </div>
          <div class="tright-4">
            <span>全屋方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
          <div class="tright-5">
            <div>需求描述</div>
            <div>
              <p>这里是该套餐的内容介绍：该户型比较不规范，转角以及不规则的开关区域较多，导致浪费了较多的空间。业主是比较传统的中国知识女性，在沟通的时候，获希望能装修成新中风格。本套方案，通过对家具、饰品等商品的选材极大的考虑了这个问题，结合一些特殊商品，很好的将本来不能摆放家具的地方，巧妙地摆放了家具。</p>
            </div>
          </div>
          <div class="tright-6">
            <div>
              <img src="../../static/img/head01.png" alt="">
              <span>彭于晏</span>
            </div>
            <div>
              <button @click="lijiduihuan">{{text1}}</button>
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
          <detail :is="detail"></detail>
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
                    <div><span>广州天河·恒大御府</span><span>02户型</span><span>78m2</span></div>
                    <div><span>50积分</span></div>
                    <div>
                      <div><span></span><span>张若昀</span></div>
                      <div><span></span><span>15205201520</span></div>
                      <div><span></span><span>天河区科韵路方圆E时光</span></div>
                    </div>
                    <div>
                      <span>全屋方案</span>
                      <span>装修阶段</span>
                      <span>一室一厅</span>
                      <span>北欧</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div><span>本次消耗：</span><span>50积分</span></div>
                <div><span>当前积分余额：</span><span>500积分</span></div>
              </div>
              <div>
                <button @click="sucbtn">确认兑换</button>
              </div>
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

          title:"您即将获得",
          enought:true,
          sucduihuan:true
        }
      },
      methods:{
        navBtn(index,component){
          $(event.target).addClass('sel');
          $(event.target).siblings('li').removeClass('sel')
          this.$data.detail = component
        },
        sucbtn(){
          if(this.enought==true){
            this.duihuan = false;
            this.title = "";
            this.suc = true;
          }
        },
        lijiduihuan(){
          this.tan1 = true
          if(this.sucduihuan==true){
            this.text1 = "已兑换"
            $(event.target).attr({
              "disabled":"disabled"
            })
          }
        },
        closetan(){
          this.tan1 = false
          if(this.enought==true){
            this.duihuan = true;
            this.title = "您即将获得";
            this.suc = false;
          }
        }
      },
      watch:{
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
@import "../../static/sass/shareProject";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
