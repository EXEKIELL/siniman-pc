<template>
  <div id="personCenter" class="clearFix">
    <div class="wrap1">
      <div id="swiper1" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <router-link to="#">
              <img :src="item.src" alt="">
            </router-link>
          </div>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev">
          <img src="../../static/img/btn-left.png" alt="">
        </div>
        <div class="swiper-button-next">
          <img src="../../static/img/btn-right.png" alt="">
        </div>
      </div>
    </div>
    <div class="wrap2 clearFix">
      <div class="w2-left">
        <div class="clearFix left-1">
          <div class="clearFix">
            <div>我的业绩：</div>
            <div class="clearFix">
              <div class="detaSel1">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <button class="aaa" @click="dianwo">
                <img src="../../static/img/icon11.png" alt="">
              </button>
            </div>
          </div>
          <div>
            <router-link to="#">全部明细</router-link>
          </div>
        </div>
        <div class="left-2">
          <canvas id="canvas1"  height="320"></canvas>
        </div>
      </div>
      <div class="w2-right">
        <div class="clearFix left-1">
          <div class="clearFix">
            <div>我的客户：</div>
            <div class="clearFix">
              <div class="detaSel2">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <button class="aaa" @click="dianwo">
                <img src="../../static/img/icon11.png" alt="">
              </button>
            </div>
          </div>
          <div>
            <router-link to="#">全部明细</router-link>
          </div>
        </div>
        <div class="left-2">
          <canvas id="canvas2" width="530" height="320"></canvas>
        </div>
      </div>
    </div>
    <div class="wrap3">
      <div class="w3-title">
        <span>我的设计</span>
      </div>
      <div class="w3-nav">
        <ul>
          <li class="clearFix">
            <span class="nav-left">类型：</span>
            <div class="nav-right">
              <div v-for="(item,index) in leixing" :key="index">
                <div @click="navSel">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">阶段：</span>
            <div class="nav-right">
              <div v-for="(item,index) in jieduan" :key="index">
                <div @click="navSel">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">户型：</span>
            <div class="nav-right">
              <div v-for="(item,index) in huxing" :key="index">
                <div @click="navSel">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">风格：</span>
            <div class="nav-right">
              <div v-for="(item,index) in fengge" :key="index">
                <div @click="navSel">{{item.text}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w3-cont">
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
        <div class="list1">
          <div class="list1-img">
            <img src="../../static/img/img02.png" alt="">
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>广州天河·恒大御府</span><span>02户型</span><span>78m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>张若昀 </span>
              </div>
              <div>
                <span></span><span>15205201520</span>
              </div>
              <div>
                <span></span><span>天河区科韵路方圆E时光西座2202</span>
              </div>
            </div>
          </div>
          <div class="list1-tag">
            <span>全属方案</span><span>装修阶段</span><span>一室一厅</span><span>北欧</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="../../static/js/personCenter.js"></script>

<style lang="scss" scoped>
  @import "../../static/sass/personCenter";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
