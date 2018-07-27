import axios from 'axios'
import api from '../../api/index'
import router from '../../router/index'
import md5 from 'js-md5'
import store from "../index"
import qs from 'qs'
let Base64 = require('js-base64').Base64;
const loginInfo = {
  namespaced:true,
  state:{
    // baseUrl:'http://localhost:8080/share',
    freshState:false,
    fL:false,
    loging:true,
    form:{
      username:'',
      pswd:'',
      yanzhengma:''
    },
    loginMessage:{},
    userData:{},
    userInfo:{},
    token:null,
    sign:'',
    time:'',
    sign_1:'',//授权信息
    userId:'',
    str1:'',
    loginSuccess:null,
    headers:{},
    verify:{
      phone:'',
      verify_key:''
    },
    timer1:null,
    num1:'',
    ok:false,
    msgcount:0,
    integral:0,
  },
  mutations:{
    CHANGEFLASH(state){
      state.freshState = true
      // const userId = JSON.parse(localStorage.getItem('user-data')).user.id+'';
      // const token = JSON.parse(localStorage.getItem('user-data')).token
      // state.userId = userId;
      // state.token = token;
      // state.str1 ='?key='+userId+'&token='+token;
    },
    GETUSERNAME(state,val){
      state.form.username = val.username
    },
    GETPSWD(state,val){
      state.form.pswd = val.pswd
    },
    GETTOKEN(state,token){
      state.token = token;
      localStorage.setItem('token',JSON.stringify(token))
    },
    GETSIGN(state){
      let date = Date.parse( new Date() ).toString();
      state.time = date;
      let sign01 = md5(md5(state.token+date));
      state.sign = sign01;
      let signData = {
        time:date,
        sign:sign01
      }
      localStorage.setItem('sign',JSON.stringify(signData));

    },
    GETSIGN_1(state){
      let token = state.token;
      let sign = Base64.encode(JSON.stringify({access_token:token}));
      state.sign_1 = sign;
      localStorage.setItem('sign_1',JSON.stringify(sign));
    },
    GETUSERID(state,userId){
      state.userId = userId
    },
    LOGINVIEW(state,data){
      if(data.ok){
        state.userData = data.userData
      }
    },
    USERINFO(state,data){
      // state.userInfo = data
    },
    PHONEYZ(state,suc){
      if(suc){
        state.fL = true;
        state.loging = false;

      }
    },

    SUCCESSLOGIN(state){
      state.loginView = false;
      state.content = true;
    }
  },
  actions:{
    //用户登录请求
    LoginPost(context){

      api.axiosPost('/user/userLogin',0,{
        username:$.trim(context.state.form.username),
        password:Base64.encode($.trim(context.state.form.pswd))
      },function (res) {
        if(!res.data.data.verify_key){
          //保存token
          context.commit('GETTOKEN',res.data.data.access_token);

          //保存授权信息
          context.commit('GETSIGN_1');

          context.commit('GETSIGN');

          context.dispatch('getUserInfo');
          context.dispatch('getSystem');

          router.push('/indexWrap/personCenter');
        }else{
          context.state.loging=false
          context.state.fL=true
          context.state.verify.verify_key=res.data.data.verify_key
          context.state.verify.phone=res.data.data.phone

          const TIME = 60;
          if(!context.state.timer1){
            context.state.num1 = TIME;
            context.state.timer1 = setInterval(()=> {
              if(context.state.num1>0&&context.state.num1<=TIME){
                context.state.num1--;
              }else {
                clearInterval(context.state.timer1);
                context.state.timer1 = null;
                context.state.ok = true
              }
            },1000)
          }
        }
        //保存账号密码
        let str={user:context.state.form.username,psw:context.state.form.pswd}
        localStorage.setItem('userpsw',JSON.stringify(str))
      })
    },
    //获取用户基本信息
    getUserInfo(context){

      api.axiosPost('/userinfo/userdata',1,{},function(res){
        if(res.data.status === 200){
          //保存用户信息到本地
          localStorage.setItem('user-info',JSON.stringify(res.data.data))
          context.state.integral=res.data.data.score
        }
      })

      //
      api.axiosPost('/msg/msgStatis',1,{},function (res) {
         if(res.data.status === 200){
           if(res.data.data>=99){
             context.state.msgcount='99+'
           }else{
             context.state.msgcount=res.data.data
           }

         }
      })
    },
    //获取系统配置
    getSystem(context){
      api.axiosPost('/system/sysconfig',1,{},function(res){
        if(res.data.status === 200){
          //保存用户信息到本地
          localStorage.setItem('sysconfig',JSON.stringify(res.data.data))
        }
      })
    },
    // 修改页面是否刷新状态
    changeFreshState(context){
      context.commit('CHANGEFLASH')
    },
    phoneyanzheng(context){
      let _this=this
      api.axiosPost('/user/validcode',0,{
        code:context.state.form.yanzhengma,
        verify_key:context.state.verify.verify_key,
      },function(res){
        //保存token
        context.commit('GETTOKEN',res.data.data.access_token);

        //保存授权信息
        context.commit('GETSIGN_1');

        context.commit('GETSIGN');

        context.dispatch('getUserInfo');
        context.dispatch('getSystem');
        router.push('/indexWrap/personCenter');
      })
    },
    getyanzheng(){
      api.axiosPost('/user/reSendValidcode',0,{
        phone:context.state.verify.phone,
        verify_key:context.state.verify.verify_key,
      })

    }
  },
  getters:{

  },
}

export default loginInfo
