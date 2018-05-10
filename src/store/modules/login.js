import axios from 'axios'
import api from '../../api/index'
import router from '../../router/index'
const loginInfo = {
  namespaced:true,
  state:{
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
    userId:'',
    str1:'',
    loginSuccess:null
  },
  mutations:{
    CHANGEFLASH(state){
      state.freshState = true
      const userId = JSON.parse(localStorage.getItem('user-data')).user.id+'';
      const token = JSON.parse(localStorage.getItem('user-data')).token
      state.userId = userId;
      state.token = token;
      state.str1 ='?key='+userId+'&token='+token;
    },
    GETUSERNAME(state,val){
      state.form.username = val.username
    },
    GETPSWD(state,val){
      state.form.pswd = val.pswd
    },
    GETTOKEN(state,token){
      state.token = token
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
      api.axiosPost('/user/checkLogin',0,context.state.form,function (res) {
        console.log(res)
        if(res.data.success!=null&&res.data.success==false){
          console.log(1)
        }else if(res.data.status!=null&&res.data.status==200){
          var data = res.data.data
          if(data.firstLogin==true){
            context.commit('PHONEYZ',true)
          }else{
            api.axiosPost('/user/userLogin',0,context.state.form,function (res) {
              var data = {
                ok:true,
                userData:res.data
              }
              //将登录请求的数据保存到vuex
              context.commit('LOGINVIEW',data);
              context.commit('GETTOKEN',data.userData.token)
              context.commit('GETUSERID',data.userData.user.id)
              console.log("用户信息已保存到vuex");
              //保存到本地
              localStorage.setItem('user-data',JSON.stringify(res.data))
              console.log("已保存到本地")
              router.push('/indexWrap/personCenter')
            })
          }
        }else{
          console.log(3)
        }
      })
    },
    //获取用户基本信息
    getUserInfo(context){
      let userId,token;
      if(localStorage.getItem('user-data')!=null){
        userId = JSON.parse(localStorage.getItem('user-data')).user.id+'';
        token = JSON.parse(localStorage.getItem('user-data')).token
      }else if(context.state.userData.length>0){
        userId = context.state.userData.user.id+''
        token = context.state.userData.token
      }else{
        router.push('/login')
      }
      api.axiosGet('/person/userInfo',{
        key:userId,
        token: token,
        userId:userId
      },function (res) {
        console.log("用户信息：",res)
        context.commit('USERINFO',res.data)
        context.commit('GETUSERID',res.data.data.userid)
        // context.commit('GETTOKEN')
        console.log(context.state.userId)
        console.log("已保存到vux")
        localStorage.setItem('user-info',JSON.stringify(res.data))
        console.log("已保存到本地")
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
export default loginInfo
