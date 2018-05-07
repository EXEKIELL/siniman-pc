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
                      <img src="../../static/img/icon06.png" alt="">
                    </router-link>

                  </li>
                  <li>
                    <router-link to="/indexWrap/messageManage">
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
                    <div @click="exit">
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
            src:"../../static/img/hlicon.png",
            text:"个人中心"
          },
          headRight:{
            // headUrl:JSON.parse(localStorage.getItem('user-info')).data.img==''?'../../static/img/head05.png':JSON.parse(localStorage.getItem('user-info')).data.img,
            message:12,
            // integral:JSON.parse(localStorage.getItem('user-info')).data.score
          },
          swiperList:[
            {src:"../../static/img/img01.png"},
            {src:"../../static/img/img01.png"},
            {src:"../../static/img/img01.png"}
          ],
          shou2List:[
            {text:"帐号分配",path:"/indexWrap/accountAssignment",selClass:false},
            {text:"我的门店",path:"/indexWrap/myShop",selClass:false},
            {text:"我的方案",path:"/indexWrap/myProjectIndex",selClass:false},
            {text:"我的资料",path:"/indexWrap/myData",selClass:false},
            {text:"积分明细",path:"/indexWrap/integralDetail",selClass:false},
            {text:"我的订单",path:"/indexWrap/myIndent",selClass:false},
            {text:"我的收藏",path:'/indexWrap/myCollect',selClass:false}
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
          console.log(to,from)
        }
      },
      beforeUpdate(){
        var to = this.$router.history.current.path
        if(to == '/indexWrap/shareCommunity'){
          this.headLeft.text = '分享社区'
          $('#lis2 .list2').css({
            "background-color":"#333333"
          })
          $('#lis1 .list1').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2').slideUp();
          $('#lis1 .shou1').slideDown();
        }else if(to == '/indexWrap/personCenter'){
          this.headLeft.text = '个人中心'
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .list2 span').css({
            transform:"rotateZ(90deg)"
          })
        }else if(to == '/indexWrap/accountAssignment'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(1)').addClass('sel')
        }else if(to == '/indexWrap/myShop'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(2)').addClass('sel')
        }else if(to == '/indexWrap/myProjectIndex'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(3)').addClass('sel')
        }else if(to == '/indexWrap/myData'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(4)').addClass('sel')
        }else if(to == '/indexWrap/integralDetail'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(5)').addClass('sel')
        }else if(to == '/indexWrap/myIndent'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(6)').addClass('sel')
        }else if(to == '/indexWrap/myCollect'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          for(var i = 0;i<$('#lis2 .shou2>li').length;i++){
            $('#lis2 .shou2>li').removeClass('sel')
          }
          $('#lis2 .shou2>li:nth-child(7)').addClass('sel')
        }
      },
      mounted(){
        var to = this.$router.history.current.path
        if(to == '/indexWrap/shareCommunity'){
          this.headLeft.text = '分享社区'
          $('#lis2 .list2').css({
            "background-color":"#333333"
          })
          $('#lis1 .list1').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2').slideUp();
          $('#lis1 .shou1').slideDown();
        }else if(to == '/indexWrap/personCenter'){
          this.headLeft.text = '个人中心'
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .list2 span').css({
            transform:"rotateZ(90deg)"
          })
        }else if(to == '/indexWrap/accountAssignment'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(1)').addClass('sel')
        }else if(to == '/indexWrap/myShop'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(2)').addClass('sel')
        }else if(to == '/indexWrap/myProjectIndex'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(3)').addClass('sel')
        }else if(to == '/indexWrap/myData'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(4)').addClass('sel')
        }else if(to == '/indexWrap/integralDetail'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(5)').addClass('sel')
        }else if(to == '/indexWrap/myIndent'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
          $('#lis2 .shou2>li:nth-child(6)').addClass('sel')
        }else if(to == '/indexWrap/myCollect'){
          $('#lis1 .list1').css({
            "background-color":"#333333"
          })
          $('#lis2 .list2').css({
            "background-color":"#a51e32"
          })
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
