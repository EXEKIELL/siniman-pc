<template>
  <div id="personCenter" class="clearFix">
    <div class="wrap1">
      <div id="swiper1" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <router-link to="#">
              <img :src="item.imgurl" alt="">
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
                  type="daterange"
                  @change="change"
                  value-format="yyyy-MM-dd"
                  :start-placeholder="firstDay"
                  :end-placeholder="today">
                </el-date-picker>
              </div>
              <button class="aaa" @click="dianwo"></button>
            </div>
          </div>
          <div>
            <router-link to="/indexWrap/myPerformaceDetail">全部明细</router-link>
          </div>
        </div>
        <div class="left-2">
          <div id="canvas1" class="echarts"></div>
        </div>
      </div>
      <div class="w2-right">
        <div class="clearFix left-1">
          <div class="clearFix">
            <div>我的客户：</div>
            <div class="clearFix">
              <div class="detaSel2">
                <el-date-picker
                  v-model="value2"
                  @change="change1"
                  type="daterange"
                  :start-placeholder="firstDay"
                  :end-placeholder="today">
                </el-date-picker>
              </div>
              <button class="aaa" @click="dianwo"></button>
            </div>
          </div>
          <div>
            <router-link to="/indexWrap/myClientDetail">全部明细</router-link>
          </div>
        </div>
        <div class="left-2">
          <div id="canvas2" class="echarts"></div>
        </div>
      </div>
    </div>
    <div class="wrap3">
      <div class="w3-title">
        <span>已分享方案</span>
      </div>
      <div class="w3-nav">
        <ul>
          <li class="clearFix" v-for="(item,index) in tagList" :key="index">
            <span class="nav-left">{{item.cat_name+'：'}}</span>
            <div class="nav-right">
              <div>
                <div @click="navSel('全部',index)" class="sel" >全部</div>
              </div>
              <div v-for="(item1,index1) in item.lists" :key="index1">
                <div @click="navSel(index,index1)" >{{item1.tagname}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w3-cont">
        <template v-if="postData.list">
          <template v-if="postData.list.length>=1">
            <div style="cursor: pointer;" class="list1"  v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">
              <div class="list1-img" v-if="" style="">
                <img :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">

                <div style="top: 0;left: 0;">
                  <button style="border: 0;background-color: rgba(255,0,0,0.8);" @click="share(item.id)">分享家·赢豪礼</button>
                </div>
                <!--<div>-->
                <!--<div>-->
                <!--<img src="../../static/img/img_sm01.png" alt="">-->
                <!--<div class="maskSm">-->
                <!--<button>设为封面</button>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
              </div>
              <div class="list1-cont">
                <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span><span>{{item.area}}m²</span></div>
                <div class="l1cont-2 clearFix">
                  <div v-if="item.customername != '' && item.customername !='--' && item.customername !=0">
                    <span></span><span>{{item.customername}}</span>
                  </div>
                  <div v-if="item.customercontact != '' && item.customercontact !=0 && item.customercontact !='--' ">
                    <span></span><span>{{item.customercontact}}</span>
                  </div>
                  <div v-if="item.customeraddr != '' && item.customeraddr !=0 && item.customeraddr !='--'  ">
                    <span></span><span>{{item.customeraddr}}</span>
                  </div>
                </div>
              </div>

              <div class="list1-tag" v-if="item.producttag[0].length>=1">
                <span v-for="(item1,index1) in item.producttag[0]" :key="index1" v-if="index1<4">
                  <template v-if="item1">
                        {{item1.tagname}}
                  </template>

                </span>
              </div>
            </div>
          </template>
          <template v-else>
            <div style="height: 100px;line-height: 100px; width: 100%;text-align: center;font-size: 20px">
              该类目下还没有设计方案哦
            </div>
          </template>
        </template>

      </div>
    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="pageChange"
        :total="postData.last_page*10">
      </el-pagination>
    </div>
  </div>
</template>
<script src="../../static/js/personCenter.js"></script>
<style lang="scss" scoped>
  @import "../../static/sass/personCenter";
</style>
<style lang="scss">
  @import "../../static/sass/public";
  .echarts{
    width: 600px !important;
    height: 320px !important;
  }
</style>
