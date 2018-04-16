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
          <button><span></span><span>分享家·赢豪礼，最高可得苹果笔记本电脑</span></button>
          <button><span></span><span>编辑客户信息</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "MyProject",
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
