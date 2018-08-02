<template>
    <div id="indexWrap" style="height: 100%">
      <el-container>
        <el-aside width="200px" v-if="true">
          <div class="asideWrap">
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
                    <template v-if="item.children.length==0">
                      <router-link :to="item.path">
                        <span></span>{{item.text}}
                      </router-link>
                    </template>
                    <template v-else>
                      <div @click="showSlide">
                        <router-link to="" style="position: relative">
                          <span></span>{{item.text}}<span class="icon"></span>
                        </router-link>
                      </div>
                    </template>
                    <ul class="shou3" style="text-align: right;margin-right: 45px">
                      <li v-for="(item1,index1) in item.children" :key="index1">
                        <router-link :to="{path:item1.path,query:{prostatus:item1.status},cache:false}">
                          {{item1.text}}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </el-aside>
        <el-container>
          <el-header>
            <div class="clearFix head">
              <div class="head-left">
                <span><img :src="headLeft.src" onerror="this.src='./static/img/head05.png'"></span><span>{{headLeft.text}}</span>
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
                      <span></span><span>消息</span><span v-show="$store.state.login.msgcount>0">{{$store.state.login.msgcount}}</span>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/indexWrap/integralDetail">
                      <span></span><span>积分：</span><span>{{$store.state.login.integral}}</span>
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
            {text:"我的账号",path:"/indexWrap/accountAssignment",selClass:false,show:false,children:[]},
            {text:"我的门店",path:"/indexWrap/myShop",selClass:false,show:false,children:[]},
            {text:"我的方案",path:"/indexWrap/myProjectIndex1",selClass:false,show:true,
              children:[
                  {text:'已上架',path:'/indexWrap/myProjectIndex1',status:1},
                  {text:'待审核',path:'/indexWrap/myProjectIndex2',status:0},
                  {text:'未通过',path:'/indexWrap/myProjectIndex3',status:-1}
                ]
            },
            {text:"我的收藏",path:'/indexWrap/myCollect',selClass:false,show:true,children:[]},
            {text:"我的资料",path:"/indexWrap/myData",selClass:false,show:true,children:[]},
            {text:"积分明细",path:"/indexWrap/integralDetail",selClass:false,show:true,children:[]},
            {text:"方案获客",path:"/indexWrap/myIndent",selClass:false,show:true,children:[]},
            {text:"我的报表",path:'/indexWrap/myReport',selClass:false,show:true,children:[]},
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
          // $('#lis2 .shou2>li').removeClass('sel')
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
        },
        showSlide(){
          if($('.shou3').css('display') == 'block'){
            $('.shou3').slideUp();
            $('.icon').css({
              '-webkit-transform': 'rotateZ(0deg)',
              '-moz-transform': 'rotateZ(0deg)',
              '-ms-transform': 'rotateZ(0deg)',
              '-o-transform': 'rotateZ(0deg)',
              'transform': 'rotateZ(0deg)'
            })
          }else{
            $('.shou3').slideDown();
            $('.icon').css({
              '-webkit-transform': 'rotateZ(90deg)',
            '-moz-transform': 'rotateZ(90deg)',
            '-ms-transform': 'rotateZ(90deg)',
            '-o-transform': 'rotateZ(90deg)',
            'transform': 'rotateZ(90deg)'
            })
          }
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
        }
      },
      mounted(){
        let userinfo;
        let thas=this
        if(JSON.parse(localStorage.getItem('user-info'))){
            userinfo=JSON.parse(localStorage.getItem('user-info'))
            this.headRight.headUrl = userinfo.img==''?'./static/img/head05.png':userinfo.img;

            // this.headRight.integral = ;

            let unread= JSON.parse(localStorage.getItem('user-info')).unread;


            let roles=JSON.parse(localStorage.getItem('user-info')).roles


            let rolesArray=JSON.parse(roles)

            for(let i=0;i<rolesArray.length;i++){
              if(rolesArray[i].code=="DEALER"){
                thas.shou2List[0].show=true
              }else if(rolesArray[i].code=="SHOPMANAGER"){
                thas.shou2List[1].show=true
              }
            }

        }else{

          this.$api.axiosPost('/userinfo/userdata',1,{},function(res){

            if(res.data.status === 200){
              //保存用户信息到本地
              userinfo=res.data.data
              thas.headRight.headUrl = userinfo.img==''?'./static/img/head05.png':userinfo.img;
              thas.headRight.integral = userinfo.score;

              let unread= JSON.parse(localStorage.getItem('user-info')).unread;


              let roles=JSON.parse(localStorage.getItem('user-info')).roles


              let rolesArray=JSON.parse(roles)

              for(let i=0;i<rolesArray.length;i++){
                if(rolesArray[i].code=="DEALER"){
                  thas.shou2List[0].show=true
                }else if(rolesArray[i].code=="SHOPMANAGER"){
                  thas.shou2List[1].show=true
                }
              }
            }
          })
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
        }
        for(let item in this.shou2List){
          if(this.shou2List[item].path==to){
            this.shou2List[item].selClass=true
            $('#lis2 .list2').addClass('selBar')
            $('#lis2 .list2 span').css({
              transform:"rotateZ(90deg)"
            })
          }
        }
        let wh=$(window).height();
        console.log(wh)
        $('.asideWrap').css({height:wh+"px",backgroundColor:'#333'});
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
  .shou3{
    display: none;
  }
  .icon{
    width: 15px;
    height: 15px;
    background: url("../../static/img/icon01.png") no-repeat center!important;
    position: absolute;
    right: 10px;
    top: 20px;
  }
</style>
<style lang="scss">
  @import "../../static/sass/public";
</style>
