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
    <div class="list1">
      <div class="l1-title">
        <span>我的积分</span>
      </div>
      <div class="l1-cont">
        <div>
          <div class="bj">
            <div>
              <div>
                <span>积分余额</span>
              </div>
              <div>
                <span>{{ ago }}-{{ today2 }}</span>
              </div>
              <div>
                <span class="integral">{{list1.total}}</span>
              </div>
            </div>
            <div>
              <img src="../../static/img/icon36.png" alt="">
              <button class="link" @click="golink">积分兑换</button>
            </div>
          </div>
        </div>
        <div>
          <div class="bj">
            <div>
              <div>
                <span>近三个月获得积分</span>
              </div>
              <div>
                <span>{{ ago }}-{{ today2 }}</span>
              </div>
              <div>
                <span class="integral">{{list1.obtain}}</span>
              </div>
            </div>
            <div class="list-right">
              <img src="../../static/img/icon37.png" alt="">
            </div>
          </div>
        </div>
        <div>
          <div class="bj">
            <div>
              <div>
                <span>近三个月消耗积分</span>
              </div>
              <div>
                <span>{{ ago }}-{{ today2 }}</span>
              </div>
              <div>
                <span class="integral">{{list1.consume}}</span>
              </div>
            </div>
            <div>
              <img src="../../static/img/icon38.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="wrap2 clearFix">


      <div class="w2-left">
        <div class="clearFix left-1">
          <div class="clearFix">
            <div class="paren">
              我的业绩
              <img class="j3" src="../../static/img/icon3j.png" alt="">
            </div>

            <div class="clearFix date">
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

            </div>
          </div>
          <div>
            <router-link to="/indexWrap/myPerformaceDetail">全部>></router-link>
          </div>
        </div>
        <div class="left-2">
          <div id="canvas1" class="echarts"></div>
        </div>
      </div>
      <div class="w2-right">
        <div class="clearFix left-1">
          <div class="clearFix">
            <div class="paren">
              我的客户
              <img class="j3" src="../../static/img/icon3j.png" alt="">
            </div>
            <div class="clearFix date">
              <div class="detaSel2">
                <el-date-picker
                  v-model="value2"
                  @change="change1"
                  type="daterange"
                  :start-placeholder="firstDay"
                  :end-placeholder="today">
                </el-date-picker>
              </div>

            </div>
          </div>
          <div>
            <router-link to="/indexWrap/myClientDetail">全部>></router-link>
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
      <div class="w3-cont" v-loading.body="listLoading">
        <template v-if="postData.list">
          <template v-if="postData.list.length>=1">

            <!--<div class="list1" v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">-->
              <!--<div class="list1-img">-->
                <!--<img :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">-->

                <!--<div style="top: 0;left: 0; z-index: 200">-->
                  <!--<button style="border: 0;background-color: rgba(255,0,0,0.8);" @click.stop="share(item.id)">分享家·赢豪礼</button>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="list1-wrap">-->
                <!--<div class="list1-cont">-->
                  <!--<div class="price">-->
                    <!--<div style="width: 100%">-->
                      <!--{{ item.productionmark }}积分-->
                      <!--<template v-if="item.totalPrice">-->
                        <!--<span>总价：¥{{ item.totalPrice }}</span>-->
                        <!--<span>{{item.area}}m²</span>-->
                      <!--</template>-->
                      <!--<template v-else>-->
                        <!--<span style="float: right">{{item.area}}m²</span>-->
                      <!--</template>-->
                    <!--</div>-->

                  <!--</div>-->
                  <!--<div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span></div>-->

                  <!--<div class="l1cont-2 clearFix" v-if="item.customername != ''">-->
                    <!--<div>-->
                      <!--<span></span><span>{{item.customername}}</span>-->
                    <!--</div>-->
                    <!--<div>-->
                      <!--<span></span><span>{{phoneStr(item.customercontact)}}</span>-->
                    <!--</div>-->
                    <!--<div>-->
                      <!--<span></span><span>{{item.customeraddr|customeraddr }}</span>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="list1-tag" >-->

                  <!--<template v-if="item.producttag[0].length>=1">-->
              <!--<span v-for="(item1,index1) in item.producttag[0]" :key="index1" v-if="index1<4">-->
                <!--<template v-if="item1">-->
                    <!--{{item1.tagname}}-->
                <!--</template>-->

              <!--</span>-->
                  <!--</template>-->
                  <!--<template v-else>-->
                    <!--<span style="border-color:#fff ">...</span>-->
                  <!--</template>-->
                <!--</div>-->
                <!--<div class="list-user clearFix" v-if="showUser">-->
                  <!--<el-col :span="12">-->
                    <!--<div class="grid-left bg-purple userbox">-->
                      <!--<div class="userimg">-->
                        <!--<img :src="item.userimg" alt="" onerror="this.src='./static/img/head05.png'">-->
                      <!--</div>-->
                      <!--<div class="username">{{ item.username }}</div>-->
                    <!--</div>-->
                  <!--</el-col>-->
                  <!--<el-col :span="5">-->
                    <!--<div class="grid-content bg-purple cart">-->
                      <!--{{ item.salsecount }}-->
                    <!--</div>-->
                  <!--</el-col>-->
                  <!--<el-col :span="5">-->
                    <!--<div class="grid-content bg-purple view">-->
                      <!--{{ item.viewcount }}-->
                    <!--</div>-->
                  <!--</el-col>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <div class="list1" v-for="(item,index) in postData.list" :key="index" @click="toUrl(item.id)">
              <div class="list1-img">
                <div class="img">
                  <img :class="'bigimg_'+index" v-if="item.renders.length>=1" :src="item.renders[0].img"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
                  <img :class="'bigimg_'+index" v-else :src="item.simg"  :onerro="'this.src=\''+$api.getSystemConfig('productImg')+'\''" ralt="">
                </div>
                <div class="share" style="top: -15px;left: 0; z-index: 200">
                  <button style="border: 0;background-color: rgba(255,0,0,0.8);" @click.stop="share(item.id)">分享家·赢豪礼</button>
                </div>
                <div v-if="item.renders.length>=1">
                  <div v-for="val in item.renders">
                    <img :src="val.img" @mouseenter="replaImg(index,val.img)" alt="">
                    <div class="maskSm"></div>
                  </div>
                </div>
              </div>
              <div class="list1-wrap">
                <div class="list1-cont">
                  <div class="price">
                    <div>{{ item.productionmark }}积分 {{ item.bigimg }}</div>
                    <div class="totalPrice" v-if="item.totalPrice">&nbsp;&nbsp;总价：¥{{ item.totalPrice }}</div>
                    <div class="area"><span>{{item.area}}m²</span></div>
                  </div>
                  <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>{{item.housetype}}</span></div>

                  <div class="l1cont-2 clearFix" v-if="item.customername != ''">
                    <div>
                      <span></span><span>{{item.customername}}</span>
                    </div>
                    <div>
                      <span></span><span>{{phoneStr(item.customercontact)}}</span>
                    </div>
                    <div>
                      <span></span><span>{{item.customeraddr|customeraddr }}</span>
                    </div>
                  </div>
                </div>
                <div class="list1-tag" >

                  <template v-if="item.producttag[0].length>=1">
              <span v-for="(item1,index1) in item.producttag[0]" :key="index1" v-if="index1<4">
                <template v-if="item1">
                    {{item1.tagname}}
                </template>

              </span>
                  </template>
                  <template v-else>
                    <span style="border-color:#fff ">...</span>
                  </template>
                </div>
                <div class="list-user clearFix" v-if="showUser">
                  <el-col :span="12">
                    <div class="grid-left bg-purple userbox">
                      <div class="userimg">
                        <img :src="item.userimg" alt="" onerror="this.src='./static/img/head05.png'">
                      </div>
                      <div class="username">{{ item.username }}</div>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple cart">
                      {{ item.salsecount }}
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="grid-content bg-purple view">
                      {{ item.viewcount }}
                    </div>
                  </el-col>
                </div>
                <div v-if="item.download==1" class="download">下载方案</div>
              </div>
            </div>

          </template>
          <template v-else>
            <div style="height: 100px;line-height: 100px; width: 100%;text-align: center;font-size: 20px">
              {{ lodingstr }}
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

    <share :username="username" :url="url" :downloadButton="downloadButton" :dialogFormVisible="dialogFormVisible"></share>
  </div>
</template>
<script src="../../static/js/personCenter.js">

</script>
<style lang="scss" scoped>
  @import "../../static/sass/personCenter";
</style>
<style lang="scss" scoped>
  @import "../../static/sass/public";
  .echarts{
    width: 100% !important;
    height: 320px !important;
  }
  .detaSel1 {
    border: none !important;
    background: none !important;
    color: #000 !important;
  }
  .el-date-editor{
    cursor:pointer;
    opacity: 0;
    border: none !important;
    background: none !important;
    color: #000 !important;
  }
  .el-range-input{
    cursor:pointer;
  }
  .paren{
    position: relative;
    width: 88px;
    text-align: left;
    cursor:pointer;
  }
  .j3{
    position: absolute;
    right: 0;
    top: 14px;
    width: 15px;
  }
  .dateparen{
    position: relative;
  }
  .date{
    position: absolute;
    top: 0;
    left: -117px;
    z-index: 999;
  }
  .link{
    position: absolute;
    bottom: 0.8rem;
    background-color: #ffffff;
    padding: 5px 5px;
    cursor: pointer;
    color: #f8917c;
    font-size: 14px;
    font-weight: lighter;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .link:hover{
    -webkit-box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    -moz-box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }

</style>
