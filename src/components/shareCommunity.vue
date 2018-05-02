<template>
  <div id="shareCommunity">
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
    <div class="wrap3">
      <div class="w3-title">
        <span>共享方案</span>
      </div>
      <div class="w3-seek">
        <div>
          <div>排序：</div>
          <div>
            <ul>
              <li :class="{sel:item.isSel}" v-for="(item,index) in paixus" :key="index" @click="paixu1(index)">{{item.text}}</li>
            </ul>
          </div>
          <div>
            <input type="text" value="0" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
            <span>~</span>
            <input value="1000" type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" onafterpaste="this.value=this.value.replace(/[^0-9]/g,'')">
          </div>
        </div>
        <div>
          <input type="text" placeholder="请输入设计师姓名或文案名称">
          <button>搜索</button>
        </div>
      </div>
      <div class="w3-nav">
        <ul>
          <li class="clearFix">
            <span class="nav-left">类型：</span>
            <div class="nav-right">
              <div v-for="(item,index) in leixing" :key="index">
                <div @click="navSel" :class="{sel:index==0}">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">阶段：</span>
            <div class="nav-right">
              <div v-for="(item,index) in jieduan" :key="index">
                <div @click="navSel" :class="{sel:index==0}">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">户型：</span>
            <div class="nav-right">
              <div v-for="(item,index) in huxing" :key="index">
                <div @click="navSel" :class="{sel:index==0}">{{item.text}}</div>
              </div>
            </div>
          </li>
          <li class="clearFix">
            <span class="nav-left">风格：</span>
            <div class="nav-right">
              <div v-for="(item,index) in fengge" :key="index">
                <div @click="navSel" :class="{sel:index==0}">{{item.text}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="w3-cont">
        <div class="list1" v-for="(item,index) in listData" :key="index">
          <div class="list1-img">
            <img src="../../static/img/img05.png" alt="">
            <div>
              <button>分享家·赢豪礼</button>
              <button @click="toUrl">编辑方案</button>
            </div>
            <div>
              <div>
                <img src="../../static/img/img_sm01.png" alt="">
                <div class="maskSm">
                  <button>设为封面</button>
                </div>
              </div>
              <div>
                <img src="../../static/img/img_sm02.png" alt="">
                <div class="maskSm">
                  <button>设为封面</button>
                </div>
              </div>
              <div>
                <img src="../../static/img/img_sm03.png" alt="">
                <div class="maskSm">
                  <button>设为封面</button>
                </div>
              </div>
              <div>
                <img src="../../static/img/img_sm04.png" alt="">
                <div class="maskSm">
                  <button>设为封面</button>
                </div>
              </div>
            </div>
          </div>
          <div class="list1-cont">
            <div class="l1cont-1 clearFix"><span>{{item.productname}}</span><span>02户型</span><span>{{item.area}}m²</span></div>
            <div class="l1cont-2 clearFix">
              <div>
                <span></span><span>{{item.customername}}</span>
              </div>
              <div>
                <span></span><span>{{item.customercontact}}</span>
              </div>
              <div>
                <span></span><span>{{item.customeraddr}}</span>
              </div>
            </div>
          </div>
          <div class="list1-tag" >
            <span v-for="(item1,index1) in item.producttag" :key="index1">{{item1.tagname}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="pagina">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        @current-change="change"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
      name: "ShareCommunity",
      data(){
        return {
          swiperList:[
            {src:"./static/img/img01.png"},
            {src:"./static/img/img01.png"},
            {src:"./static/img/img01.png"}
          ],
          paixus:[
            {text:"价格",isSel:true},
            {text:"销量",isSel:false},
            {text:"点赞量",isSel:false},
            {text:"收藏量",isSel:false}
          ],
          leixing:[
            {text:"全部"},
            {text:"全屋方案"},
            {text:"空间方案"}
          ],
          jieduan:[
            {text:"全部"},
            {text:"户型阶段"},
            {text:"装修阶段"}
          ],
          huxing:[
            {text:"全部"},
            {text:"一室一厅"},
            {text:"两室一厅"},
            {text:"两室二厅"},
            {text:"三室一厅"},
            {text:"三室二厅"},
            {text:"四室一厅"},
            {text:"四室两厅"},
            {text:"其他"}
          ],
          fengge:[
            {text:"全部"},
            {text:"北欧"},
            {text:"简欧"},
            {text:"现代简约"},
            {text:"新中式"},
            {text:"其他"}
          ],
          listData:[]
        }
      },
      methods:{
        navSel(){
          var e = event.target;
          $(e).addClass("sel");
          $(e).parent('div').siblings('div').find('div').removeClass('sel')
        },
        paixu1(index){
          for(var i = 0;i<this.paixus.length;i++){
            this.paixus[i].isSel = false;
          }
          this.paixus[index].isSel = true;
        },
        toUrl(){
          this.$router.push('/indexWrap/shareProject')
        },
        change(val){
          const that = this;
          this.$api.axiosPost('/product/productList',1,{
            data:{
              orderByCondition:'DESC',
              orderByField:'productionmark'
            },
            page:{
              pageNum:val,
              pageSize:9
            }
          },function (res) {
            that.listData = res.data.data
            console.log(that.listData)
          })
        }
      },
      mounted(){
        var swiper1 = new Swiper('#swiper1',{
          pagination: '.swiper-pagination',
          paginationClickable: true,
          loop:true,
          prevButton:'.swiper-button-prev',
          nextButton:'.swiper-button-next'
        })
        const that = this;
        this.$api.axiosPost('/product/productList',1,{
          data:{
            orderByCondition:'DESC',
            orderByField:'productionmark'
          },
          page:{
            pageNum:1,
            pageSize:9
          }
        },function (res) {
          that.listData = res.data.data
          console.log(that.listData)
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/shareCommunity";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
