<template>
  <div id="app" class="clearFix">
    <div is="login" v-if="loginView"></div>
    <el-container v-if="content">
      <el-aside width="200px" v-if="true">
        <div class="logo">
          <img src="../static/img/logo.png" alt="">
        </div>
        <div class="list" id="lis1">
          <ul>
            <li class="list1" @click="handleChange1">
              <router-link to="/shareCommunity">
                <span></span>分享社区
              </router-link>
            </li>
          </ul>
        </div>
        <div class="list" id="lis2" >
          <ul>
            <li class="list2" @click="handleChange2">
              <router-link to="/personCenter" >
                <span></span>个人中心
              </router-link>
            </li>
            <ul class="shou2">
              <li v-for="(item,index) in shou2List" :class="{sel:item.selClass}" :key="index" @click="click1(index)">
                <router-link :to="item.path">
                  <span></span>{{item.text}}
                </router-link>
              </li>
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
    <div class="top" @click="toTop"></div>
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
      ],
      shou2List:[
        {text:"帐号分配",path:"/accountAssignment",selClass:false},
        {text:"我的门店",path:"/myShop",selClass:false},
        {text:"我的方案",path:"/myProjectIndex",selClass:false},
        {text:"我的资料",path:"/myData",selClass:false},
        {text:"积分明细",path:"/integralDetail",selClass:false},
        {text:"我的订单",path:"/myIndent",selClass:false}
      ]
    }
  },
  methods:{
    handleChange1(){
      $('#lis2 .list2').css({
        "background-color":"#333333"
      })
      $('#lis2 .shou2').slideUp();
      $('#lis1 .shou1').slideDown();
      $('#lis1 .list1').css({
        "background-color":"#a51e32"
      })
      $('#lis2 .list2 span').css({
        transform:"rotateZ(0deg)"
      })
    },
    handleChange2(){
      $('#lis1 .list1').css({
        "background-color":"#333333"
      })
      $('#lis1 .shou1').slideUp();
      $('#lis2 .shou2').slideDown();
      $('#lis2 .list2').css({
        "background-color":"#a51e32"
      })
      $('#lis2 .list2 span').css({
        transform:"rotateZ(90deg)"
      })
      for(var i = 0;i<this.shou2List.length;i++){
        this.shou2List[i].selClass = false;
      }
    },
    dianwo(){
      $('.el-input__inner').focus()
    },
    click1(index){
      for(var i = 0;i<this.shou2List.length;i++){
        this.shou2List[i].selClass = false;
      }
      this.shou2List[index].selClass = true
    },
    toTop(){
      $('html , body').animate({scrollTop: 0},'slow');
    }
  },
  computed:{
    content(){
      return this.$store.state.login.content
    },
    loginView(){
      return this.$store.state.login.loginView
    }
  },
  mounted(){
    $('#lis2 .list2').css({
      "background-color":"#a51e32"
    })
    $('#lis2 .list2 span').css({
      transform:"rotateZ(90deg)"
    })
    $(window).scroll(function (event) {
      if($(this).scrollTop()>100){
        $('.top').show()
      }else{
        $('.top').hide()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../static/sass/App";
</style>
<style lang="scss">
@import "../static/sass/public";
</style>
