<template>
    <div id="login">
      <div class="mask1" v-if="fL"></div>
      <div class="wrap">
        <div>
          <img src="../../static/img/logo01.png" alt="">
        </div>
        <div><span>诗尼曼分享家后台登录</span></div>
        <div>
          <form class="form1"  v-if="loging">
            <div>
              <span class="span1">
                <img src="../../static/img/loginIcon01.png" alt="">
              </span>
              <input type="text" class="userName" v-model="username.username">
              <div class="tishi1"></div>
            </div>
            <div>
              <span class="span2">
                 <img src="../../static/img/loginIcon02.png" alt="">
              </span>
              <input type="password" class="passWord" v-model="pswd.pswd">
              <div class="tishi2"></div>
            </div>
            <div><span @click="xuan"><span class="xuan"></span><input type="checkbox" ></span><span>自动登录</span></div>
            <div><button @click="sub">登录</button></div>
          </form>
          <form class="form2" v-if="fL">
            <div><input type="text" :value="phone" disabled><span @click="huoqu"><span v-if="ok">获取验证码</span><span v-else>重新获取({{num1}})</span></span></div>
            <div>
              <input type="text" placeholder="输入验证码" v-model="yanzhengma.yanzhengma">
              <div class="tishi3"></div>
            </div>
            <div><button @click="sub1">登录</button></div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
      name: "Login",
      data() {
        return {
          xuan1:true,
          num1:'',
          ok:false,
          timer:null,
          timer1:null,
          yanzhengForm:{
            phoneNum:'',
            validcode:''
          }
        }
      },
      methods:{
        sub(){
          if(this.$store.state.login.form.username==''&&this.$store.state.login.form.pswd==''){
            $('.tishi1').text("用户名不能为空")
            $('.tishi2').text('密码不能为空')
          }else if(this.$store.state.login.form.username==''){
            $('.tishi1').text("用户名不能为空")
          }else if(this.$store.state.login.form.pswd==''){
            $('.tishi2').text('密码不能为空')
          }else {
            this.$store.commit('login/LOGINPOST')
            console.log(1)
          }
          this.$nextTick(()=>{
            const TIME = 60;
            if(!this.timer1){
              this.num1 = TIME;
              this.timer1 = setInterval(()=> {
                if(this.num1>0&&this.num1<=TIME){
                  this.num1--;
                }else {
                  clearInterval(this.timer1);
                  this.timer1 = null;
                  this.ok = true
                }
              },1000)
            }
          })
        },
        sub1(){
          if(this.$store.state.login.form.yanzhengma==''){
            $('.tishi3').text("验证码不能为空")
          }else{
            console.log(this.$store.state.login.form.yanzhengma)
            this.$store.commit('login/PHONEYANZHENG')
          }
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
        fL:()=> {
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
      computed:{
        ...mapState({
          username:state=>state.login.form,
          pswd:state=>state.login.form,
          fL:state=>state.login.fL,
          loging:state=>state.login.loging,
          phone:state=>state.login.loginMessage.phone,
          yanzhengma:state=>state.login.form
        })
        // username:{
        //   get(){
        //     return this.$store.state.login.form.username
        //   },
        //   set(val){
        //     this.$store.state.dispath('changeform',val)
        //   }
        // },
        // pswd:{
        //   get(){
        //     return this.$store.state.login.form.pswd
        //   },
        //   set(val){
        //     this.$store.state.login.commit('GETPSWD',val)
        //   }
        // }
      },
      mounted(){
        $('.userName').focus(function () {
          $('.tishi1').text("")
        })
        $('.passWord').focus(function () {
          $('.tishi2').text('')
        })
        $('.userName').focusin(function () {
          $('.span1 img').attr({
            src:"../../static/img/loginIcon01_sel.png"
          })
          $('.span1').css({
            "border":"1px solid #f8c1c9",
            "backgroundColor":"#ffedf0"
          })
        })
        $('.userName').focusout(function () {
          $('.span1 img').attr({
            src:"../../static/img/loginIcon01.png"
          })
          $('.span1').css({
            "border":"1px solid #e4e4e4",
            "backgroundColor":"#f6f6f6"
          })
        })
        $('.passWord').focusin(function () {
          $('.span2 img').attr({
            src:"../../static/img/loginIcon02_sel.png"
          })
          $('.span2').css({
            "border":"1px solid #f8c1c9",
            "backgroundColor":"#ffedf0"
          })
        })
        $('.passWord').focusout(function () {
          $('.span2 img').attr({
            src:"../../static/img/loginIcon02.png"
          })
          $('.span2').css({
            "border":"1px solid #e4e4e4",
            "backgroundColor":"#f6f6f6"
          })
        })
      }
    }
</script>

<style lang="scss" scoped>
@import "../../static/sass/login";
</style>
