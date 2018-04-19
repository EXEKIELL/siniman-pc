<template>
    <div id="login">
      <div class="mask1" v-if="firstLogin"></div>
      <div class="wrap">
        <div>
          <img src="../../static/img/logo01.png" alt="">
        </div>
        <div><span>诗尼曼分享家后台登录</span></div>
        <div>
          <form class="form1" :model="form" v-if="loging">
            <div><span>
              <img src="../../static/img/loginIcon01.png" alt="">
            </span><input type="text" v-model="form.username"></div>
            <div><span>
               <img src="../../static/img/loginIcon02.png" alt="">
            </span><input type="password" v-model="form.pswd"></div>
            <div><span @click="xuan"><span class="xuan"></span><input type="checkbox" ></span><span>自动登录</span></div>
            <div><button @click="sub">登录</button></div>
          </form>
          <form class="form2" v-if="firstLogin">
            <div><input type="tel"><span @click="huoqu"><span v-if="ok">获取验证码</span><span v-else>重新获取({{num1}})</span></span></div>
            <div><input type="text" placeholder="输入验证码"></div>
            <div><button>登录</button></div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "Login",
      data() {
        return {
          xuan1:false,
          loging:true,
          firstLogin:false,
          ok:true,
          num1:'',
          timer:null,
          form: {
            username: '',
            pswd:''
          }
        }
      },
      methods:{
        sub(){
          console.log(this.$data.form)
          // this.loging = false
          console.log(this.firstLogin)
          this.loging = false
          this.firstLogin = true
          console.log(this.firstLogin)
          // if(this.$data.form.username == ''){
          //   $('.name').text("用户名不能为空")
          // }else if(this.$data.form.pswd == ''){
          //   $('.pw').text("密码不能为空")
          // }else{
          //   this.$http({
          //     url: 'http://118.24.62.151:8080/snimay_sharing/user/checkLogin',
          //     method: 'POST',
          //     params:this.$data.form,
          //     headers: {
          //       'Content-Type': 'x-www-from-urlencoded'
          //     }
          //   }).then(function (res) {
          //     var loginData = res.body.data;
          //     console.log(loginData)
          //     if(loginData.fristLogin == false){
          //       this.$store.commit("logined")
          //     }else{
          //
          //     }
          //   }, function () {
          //     console.log("请求失败")
          //   });
          // }
        },
        reset1(){
          this.$data.form.username = "";
          this.$data.form.pswd = "";
        },
        xuan(){
          if(this.$data.xuan1==false){
            $('.xuan').show()
            $(event.target).find('input').attr("checked")
            this.$data.xuan1 = true
          }else{
            $('.xuan').hide();
            $(event.target).find('input').removeAttr("checked")
            this.$data.xuan1 = false
          }
        },
        huoqu(){
          this.ok = false;
          var e = event.target
          const TIME = 60;
          if(!this.timer){
            this.num1 = TIME;
            this.timer = setInterval(()=> {
              if(this.num1>0&&this.num1<=TIME){
                console.log(1)
                this.num1--;
              }else {
                clearInterval(this.timer);
                this.timer = null;
                this.ok = true
              }
            },1000)
          }
        }
      },
      watch:{
        firstLogin:()=> {
          if(this.firstLogin = false){
            $('.wrap').css({
              "box-shadow":"0 0 30px #e4e4e4"
            })
          }else{
            $('.wrap').css({
              "box-shadow":"none"
            })
          }
        }
      },
      mounted(){
        // $('.form2 input').focusin(function () {
        //   $(this).css({
        //     "border":"1px solid #f8c1c9"
        //   })
        // })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/login";
</style>
