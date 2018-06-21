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
    baseUrl:'http://share.hengdikeji.com/pc',
    freshState:false,
    fL:false,
    loging:true,
    form:{
      username:'',
      pswd:''
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
    headers:{}
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
      console.log(state.sign);
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
      state.userInfo = data
    },
    PHONEYZ(state,suc){
      if(suc){
        state.fL = true;
        state.loging = false;

      }
    },
    PHONEYANZHENG(state,baseURL){
      console.log(baseURL)
      axios({
        url:baseURL+'/user/checkValidecode',
        method:'post',
        headers:this.state.headers[0],
        params:{
          phoneNum:state.form.phone,
          validcode:state.form.yanzhengma
        }
      }).then(res=>{
        console.log(res)
      })
    },
    SUCCESSLOGIN(state){
      state.loginView = false;
      state.content = true;
    }
  },
  actions:{
    //用户登录请求
    LoginPost(context){
      api.axiosPost('/login',0,{
        username:$.trim(context.state.form.username),
        password:$.trim(context.state.form.pswd)
      },function (res) {
        console.log(res);
        if(!res.data.data.verify_key){
          //保存token
          context.commit('GETTOKEN',res.data.data.access_token);
          console.log(context.state.token);
          //保存授权信息
          context.commit('GETSIGN_1');
          console.log(context.state.sign_1);
          context.commit('GETSIGN');
          console.log(context.state.sign);
          context.dispatch('getUserInfo');
          router.push('/indexWrap/personCenter');
        }
      })
    },
    //获取用户基本信息
    getUserInfo(context){
      axios({
        method:'post',
        url:'http://share.hengdikeji.com/pc/user/userdata',
        headers:{'Authorization':'Basic '+context.state.sign_1},
        data:{
          sign:context.state.sign,
          time:parseInt(context.state.time)
        },
        transformRequest: [function (data) {
          Object.keys(data).forEach((key) => {
            if ((typeof data[key]) === 'object') {
              data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
            }
          })
          data = qs.stringify(data) // 这里必须使用qs库进行转换
          return data
        }]
      }).then(res=>{
        console.log(res);
        if(res.data.status == 200){
          //保存用户信息到本地
          localStorage.setItem('user-info',JSON.stringify(res.data.data))
          //保存用户到仓库
          context.state.userInfo = res.data.data;
        }
      })
    },
    // 修改页面是否刷新状态
    changeFreshState(context){
      context.commit('CHANGEFLASH')
    }
  },
  getters:{

  }
}
console.log($)
export default loginInfo
