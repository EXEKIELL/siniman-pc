<template>
    <div id="indexWrap">
      <el-container>
        <el-aside width="200px" v-if="true">
          <div class="logo">
            <img src="../../static/img/logo.png" alt="">
          </div>
          <div class="list" id="lis1">
            <ul>
              <li class="list1" @click="handleChange1">
                <router-link to="/indexWrap/shareCommunity">
                  <span></span>分享社区
                </router-link>
              </li>
            </ul>
          </div>
          <div class="list" id="lis2" >
            <ul>
              <li class="list2" @click="handleChange2">
                <router-link to="/indexWrap/personCenter" >
                  <span></span>个人中心
                </router-link>
              </li>
              <ul class="shou2">
                <li v-for="(item,index) in shou2List" v-show="item.show" :class="{sel:item.selClass}" :key="index" @click="click1(index)">
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
                <span><img :src="headLeft.src" onerror="'../../static/img/head05.png'"></span><span>{{headLeft.text}}</span>
              </div>
              <div class="head-right">
                <ul class="clearFix">
                  <li>
                    <router-link to="#">
                      <div><img :src="headRight.headUrl" alt=""></div>
                      <img src="../../static/img/icon06.png" alt="">
                    </router-link>

                  </li>
                  <li>
                    <router-link to="/indexWrap/messageXq">
                      <span></span><span>消息</span><span v-show="headRight.message">{{headRight.message}}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="#">
                      <span></span><span>积分：</span><span>{{headRight.integral}}</span>
                    </router-link>
                  </li>
                  <li v-if="false">
                    <router-link to="#">
                      <span></span><span>修改密码</span>
                    </router-link>
                  </li>
                  <li>
                    <div @click="exit" style="cursor:pointer">
                      <span></span><span>退出</span>
                    </div>
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
    export default {
      name: "IndexWrap",
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
            headUrl:'',
            message:0,
            integral:''
          },
          swiperList:[
            {src:"./static/img/img01.png"},
            {src:"./static/img/img01.png"},
            {src:"./static/img/img01.png"}
          ],
          shou2List:[
            {text:"我的账号",path:"/indexWrap/accountAssignment",selClass:false,show:false},
            {text:"我的门店",path:"/indexWrap/myShop",selClass:false,show:false},
            {text:"我的方案",path:"/indexWrap/myProjectIndex",selClass:false,show:true},
            {text:"我的资料",path:"/indexWrap/myData",selClass:false,show:true},
            {text:"积分明细",path:"/indexWrap/integralDetail",selClass:false,show:true},
            {text:"我的订单",path:"/indexWrap/myIndent",selClass:false,show:true},
            {text:"我的收藏",path:'/indexWrap/myCollect',selClass:false,show:true},
            {text:"我的报表",path:'/indexWrap/myReport',selClass:false,show:true},
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
          // $('.el-input__inner').focus()
        },
        click1(index){
          $('#lis2 .shou2>li').removeClass('sel')
          for(var i = 0;i<this.shou2List.length;i++){
            this.shou2List[i].selClass = false;
          }
          this.shou2List[index].selClass = true
        },
        toTop(){
          $('html , body').animate({scrollTop: 0},'slow');
        },
        exit(){
          this.$confirm('此操作将退出登录, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            localStorage.clear();
            this.$data.show = false
            this.$destroy();
            this.$router.replace('/login')
            this.$message({
              type: 'success',
              message: '成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
      },
      computed:{

      },
      watch:{
        '$router':function (to, from) {
        }
      },
      beforeUpdate(){
        //判断当前路由位置
        var to = this.$router.history.current.path
        if(to == '/indexWrap/shareCommunity'){
          this.headLeft.text = '分享社区'
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .list2').removeClass('selBar')
          $('#lis1 .list1').addClass('selBar')
          $('#lis2 .shou2').slideUp();
          $('#lis1 .shou1').slideDown();
        }else if(to == '/indexWrap/personCenter'){
          this.headLeft.text = '个人中心'
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          $('#lis2 .list2 span').css({
            transform:"rotateZ(90deg)"
          })
        }else if(to == '/indexWrap/accountAssignment'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(1)').addClass('sel')
        }else if(to == '/indexWrap/myShop'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(2)').addClass('sel')
        }else if(to == '/indexWrap/myProjectIndex'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(3)').addClass('sel')
        }else if(to == '/indexWrap/myData'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(4)').addClass('sel')
        }else if(to == '/indexWrap/integralDetail'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(5)').addClass('sel')
        }else if(to == '/indexWrap/myIndent'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(6)').addClass('sel')
        }else if(to == '/indexWrap/myCollect'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(7)').addClass('sel')
        }
      },
      mounted(){
        let userinfo=JSON.parse(localStorage.getItem('user-info'))

        this.headRight.headUrl = userinfo.img==''?'../../static/img/head05.png':userinfo.img;
        this.headRight.integral = userinfo.score;
        let unread= JSON.parse(localStorage.getItem('user-info')).unread;
        if(unread>=99){
          this.headRight.message="99+"
        }else{
          this.headRight.message=unread
        }
        console.log("我的未读消息："+unread);
        let roles=JSON.parse(localStorage.getItem('user-info')).roles
        let thas=this

        let rolesArray=JSON.parse(roles)

        for(let i=0;i<rolesArray.length;i++){
          if(rolesArray[i].code=="DEALER"){
            thas.shou2List[0].show=true
          }else if(rolesArray[i].code=="SHOPMANAGER"){
            thas.shou2List[1].show=true
          }
        }

        //判断当前路由位置
        var to = this.$router.history.current.path
        if(to == '/indexWrap/shareCommunity'){
          this.headLeft.text = '分享社区'
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .list2').removeClass('selBar')
          $('#lis1 .list1').addClass('selBar')
          $('#lis2 .shou2').slideUp();
          $('#lis1 .shou1').slideDown();
        }else if(to == '/indexWrap/personCenter'){
          this.headLeft.text = '个人中心'
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          $('#lis2 .list2 span').css({
            transform:"rotateZ(90deg)"
          })
        }else if(to == '/indexWrap/accountAssignment'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(1)').addClass('sel')
        }else if(to == '/indexWrap/myShop'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(2)').addClass('sel')
        }else if(to == '/indexWrap/myProjectIndex'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(3)').addClass('sel')
        }else if(to == '/indexWrap/myData'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(4)').addClass('sel')
        }else if(to == '/indexWrap/integralDetail'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(5)').addClass('sel')
        }else if(to == '/indexWrap/myIndent'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(6)').addClass('sel')
        }else if(to == '/indexWrap/myCollect'){
          $('#lis1 .list1').removeClass('selBar')
          $('#lis2 .list2').addClass('selBar')
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(7)').addClass('sel')
        }
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
  @import "../../static/sass/indexWrap";
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
