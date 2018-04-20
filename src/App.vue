<template>
  <div id="app" class="clearFix">
    <div is="login" v-if="loginView"></div>
    <el-container v-if="content">
      <el-aside width="200px" v-if="true">
        <div class="logo">
          <img src="../static/img/logo.png" alt="">
        </div>
        <div class="list" >
          <ul>
            <li class="list1" @click="handleChange1">
              <router-link to="/shareCommunity">
                <span></span>分享社区
              </router-link>
            </li>
          </ul>
        </div>
        <div class="list" >
          <ul>
            <li class="list2" @click="handleChange2">
              <router-link to="/personCenter">
                <span></span>个人中心
              </router-link>
            </li>
            <ul class="shou2">
              <li><router-link to="#">
                <span></span>我的门店
              </router-link></li>
              <li><router-link to="/myProjectIndex">
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
                  <router-link to="/messageManage">
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Login from './components/login'
export default {
  name: 'App',
  components:{
    login:Login
  },
  data(){
    return {
      show1:true,
      show2:true,
      login:Login,
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
  computed:{
    content(){
      return this.$store.state.content
    },
    loginView(){
      return this.$store.state.loginView
    }
  },
  mounted(){

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
  .el-container{
    width: 100%;
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
            left: -1px;
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
  }

}
</style>
<style lang="scss">
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
</style>
