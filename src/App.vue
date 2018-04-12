<template>
  <div id="app" class="clearFix">
    <el-container>
      <el-aside width="200px">
        <div class="logo">
          <img src="../static/img/logo.png" alt="">
        </div>
        <div class="list" >
          <ul>
            <li class="list1" @click="handleChange1">
              <router-link to="#">
                <span></span>分享社区
              </router-link>
            </li>
            <ul class="shou1">
              <li><router-link to="#">
                <span></span>我的门店
              </router-link></li>
              <li><router-link to="#">
                <span></span>我的方案
              </router-link></li>
              <li><router-link to="#">
                <span></span>个人资料
              </router-link></li>
              <li><router-link to="#">
                <span></span>积分明细
              </router-link></li>
            </ul>
          </ul>
        </div>
        <div class="list" >
          <ul>
            <li class="list2" @click="handleChange2">
              <router-link to="#">
                <span></span>个人中心
              </router-link>
            </li>
            <ul class="shou2">
              <li><router-link to="#">
                <span></span>我的门店
              </router-link></li>
              <li><router-link to="#">
                <span></span>我的方案
              </router-link></li>
              <li><router-link to="#">
                <span></span>个人资料
              </router-link></li>
              <li><router-link to="#">
                <span></span>积分明细
              </router-link></li>
            </ul>
          </ul>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="clearFix head">
            <div class="head-left">
              <span><img :src="headLeft.src"></span><span>{{headLeft.text}}</span>
            </div>
            <div class="head-right">
              <ul class="clearFix">
                <li>
                  <router-link to="#">
                    <div><img :src="headRight.headUrl" alt=""></div>
                    <img src="../static/img/icon06.png" alt="">
                  </router-link>

                </li>
                <li>
                  <router-link to="#">
                    <span></span><span>消息</span><span>{{headRight.message}}</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="#">
                    <span></span><span>积分：</span><span>{{headRight.integral}}</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="#">
                    <span></span><span>修改密码</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="#">
                    <span></span><span>退出</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </el-header>
        <el-main>
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
                <img src="../static/img/btn-left.png" alt="">
              </div>
              <div class="swiper-button-next">
                <img src="../static/img/btn-right.png" alt="">
              </div>
            </div>
          </div>
          <div class="wrap2 clearFix">
            <div class="w2-left">
              <div class="clearFix left-1">
                <div>
                  <div>我的业绩：</div>
                  <div class="clearFix">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                    <button class="aaa" @click="dianwo">
                      <img src="../static/img/icon11.png" alt="">
                    </button>
                  </div>
                </div>
                <div>
                  <router-link to="#">全部明细</router-link>
                </div>
              </div>
              <div class="left-2">
                <canvas id="canvas1" width="100%" height="100%"></canvas>
              </div>
            </div>
            <div class="w2-right"></div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      show1:true,
      show2:true,
      value1: '',
      headLeft: {
        src:"./static/img/hlicon.png",
        text:"个人中心"
      },
      headRight:{
        headUrl:"./static/img/head01.png",
        message:12,
        integral:5324
      },
      swiperList:[
        {src:"./static/img/img01.png"},
        {src:"./static/img/img01.png"},
        {src:"./static/img/img01.png"}
      ]
    }
  },
  methods:{
    handleChange1(){
      if(this.$data.show1){
        $('.shou1').slideDown();
        $('.list1').css({
          "background-color":"#a51e32"
        })
      }else{
        $('.shou1').slideUp();
        $('.list1').css({
          "background-color":"#333333"
        })
      }
      this.$data.show1 = !this.$data.show1
    },
    handleChange2(){
      if(this.$data.show2){
        $('.shou2').slideDown();
        $('.list2').css({
          "background-color":"#a51e32"
        })
      }else{
        $('.shou2').slideUp();
        $('.list2').css({
          "background-color":"#333333"
        })
      }
      this.$data.show2 = !this.$data.show2
    },
    dianwo(){
      $('.el-input__inner').focus()
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
    var cas = $('#canvas1')[0].getContext('2d');
    console.log(cas)
  }
}
</script>

<style lang="scss" scoped>
.clearFix::after{
  content: '';
  display: block;
  visibility: hidden;
  clear: both;
  height: 0;
}
.clearFix{
  zoom: 1;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  >div{
    float: left;
  }
  .el-header, .el-footer {
    background-color: #f6f6f6;
    color: #333;
    text-align: center;
    padding: 0 40px;
  }
  .el-header{
    border-bottom: 1px solid #e4e4e4;
    .head{
      position: relative;
      height: 100%;
      .head-left{
        float: left;
        padding: 20px 0;
        >span{
          display: inline-block;
          vertical-align: middle;
          font-size: 14px;
          color: #333333;
        }
        >span:first-child{
          width: 11px;
          height: 12px;
          margin-right: 6px;
          img{
            width: 100%;
          }
        }
      }
      .head-right{
        position: absolute;
        top: 0;
        right: 0;
        ul{
          >li{
            float: left;
            padding: 0px 35px;
            font-size: 14px;
            color: #333333;
            height: 20px;
            position: relative;
            margin: 20px 0;
            a{
              font-size: 14px;
              color: #333333;
            }
            span{
              display: inline-block;
              vertical-align: middle;
              margin-top: -2.5%;
            }
          }
          >li::before{
            content: '';
            display: block;
            height: 100%;
            border-left: 1px solid #e4e4e4;
            position: absolute;
            top: 0;
            left: 0;
          }
          >li:nth-child(1){
            >a{
              width: 40px;
              height: 40px;
              display: block;
              position: relative;
              top: 0;
              margin-top: -25%;
              >div{
                border-radius: 50%;
                overflow: hidden;
                >img{
                  height: 100%;
                }
              }
              >img{
                width: 11px;
                height: 12px;
                position: absolute;
                bottom: 0;
                right: 0;
              }
            }
          }
          >li:nth-child(2){
            a{
              >span:first-child{
                width: 13px;
                height: 15px;
                background: url("../static/img/icon07.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 5px;
              }
              >span:last-child{
                padding: 0 1px;
                text-align: center;
                margin-left: 5px;
                background-color: #ff0000;
                border-radius: 50%;
                font-size: 10px;
                color: #ffffff;
              }
            }
          }
          >li:nth-child(3){
            a{
              >span:first-child{
                width: 16px;
                height: 15px;
                background: url("../static/img/icon08.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 5px;

              }
            }
          }
          >li:nth-child(4){
            a{
              >span:first-child{
                width: 10px;
                height: 14px;
                background: url("../static/img/icon09.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 5px;
              }
            }
          }
          >li:nth-child(5){
            a{
              >span:first-child{
                width: 14px;
                height: 15px;
                background: url("../static/img/icon10.png") no-repeat;
                background-size: 100% 100%;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }

  .el-aside {
    background-color: #333333;
    color: #333;
    text-align: center;
    line-height: 200px;
    .logo{
      width: 100%;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      display: -webkit-flex;
      -webkit-align-items: center;
      -webkit-justify-content: center;
      -webkit-flex-direction: column;
      border-bottom: 1px solid #444444;
    }
    .list{
      >ul{
        font-size: 0;
        line-height: 60px;
        >li{
          a{
            font-size: 14px;
            color: #ecf1f5;
            span{
              display: inline-block;
              width: 15px;
              height: 15px;
              vertical-align: middle;
              background: url("../static/img/icon01.png") no-repeat;
              background-position: 6px 2px;
              margin-right: 5px;
            }
          }
        }
        >ul{
          background-color: #444444;
          display: none;
          >li{
            padding-left: 30px;
            a{
              font-size: 14px;
              color: #ecf1f5;
              span{
                display: inline-block;
                vertical-align: middle;
                width: 20px;
                height: 20px;
                margin-right: 5px;
                background: url("../static/img/icon02.png") no-repeat;
              }
            }
          }
        }
        >li:hover{
          background-color: #a51e32;
        }
      }
    }
  }

  .el-main {
    background-color: #f6f6f6;
    color: #333;
    text-align: center;
    padding: 20px 40px;
    .wrap1{
      .swiper-container{
        width: 100%;
        .swiper-wrapper{
          width: 100%;
          .swiper-slide{
            width: 100%;
            a{
              display: block;
              img{
                width: 100%;
              }
            }
          }
        }
        .swiper-button-prev,.swiper-button-next{
          background-image: none;
          background-color: rgba(0,0,0,0.1);
          width: 50px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          display: -webkit-flex;
          -webkit-align-items: center;
          -webkit-justify-content: center;
          -webkit-flex-direction: column;
        }
        .swiper-button-prev:hover,.swiper-button-next:hover{
          background-color: #a51e32;
        }
        .swiper-pagination{
          bottom: 15px;
        }

      }
    }
    .wrap2{
      width: 100%;
      margin-top: 20px;
      >div{
        float: left;
        width: 49%;
        height: 460px;
        background-color: #fff;
      }
      >div:last-child{
        float: right;
      }
      .w2-left{
        .left-1{
          padding: 0 50px;
          margin: 30px 0 10px 0;
          >div:first-child{
            float: left;
            >div{
              display: inline-block;
              vertical-align: middle;
            }
            >div:first-child{
              font-size: 16px;
              color: #333333;
              font-weight: bold;
              margin-right: 15px;
            }
            >div:last-child{
              .el-date-editor.el-input{
                float: left;
                width: 150px;
                height: 50px;
              }
              >button{
                float: left;
                vertical-align: middle;
                background-color: #fff2ef;
                width: 50px;
                height: 50px;
                border: 1px solid #ffcac0;
                border-left: 0;
                img{
                  margin: auto;
                }
              }
            }
          }
          >div:last-child{
            float: right;
            a{
              display: block;
              font-size: 14px;
              color: #ffa897;
              padding: 14px 20px;
              background-color: #fff2ef;
              border: 1px solid #ffcac0;
            }
          }
        }
        .left-2{
          height: 345px;
          padding: 0 50px;
          #canvas1{
          }
        }
      }
    }
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
<style>
  .swiper-pagination-bullet{
    opacity: 1;
    background-color: #fff;
  }
  .swiper-pagination-bullet-active{
    background-color: #a51e32;
    width: 12px;
    height: 12px;
    position: relative;
    top: 2px;
  }
  .el-input__prefix{
    display: none;
  }
  .el-input__inner{
    height: 50px;
    border-radius: 0;
    background-color: #fff2ef;
    border: 1px solid #ffcac0;
    font-size: 16px;
    color: #333333;
  }
  .el-input__inner:focus{
    border: 1px solid #ffcac0;
  }
  .el-input__inner:hover{
    border: 1px solid #ffcac0;
  }
</style>
