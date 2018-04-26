import axios from 'axios'
const loginInfo = {
  namespaced:true,
  state:{
    content:false,
    loginView:true,
    fL:false,
    loging:true,
    form:{
      username:'',
      pswd:'',
      phone:'',
      yanzhengma:''
    },
    loginMessage:{},
    userData:{}
  },
  mutations:{
    GETUSERNAME(state,val){
      state.form.username = val.username
    },
    GETPSWD(state,val){
      state.form.pswd = val.pswd
    },
    LOGINPOST(state)
    {
      console.log(this.state)
      axios({
        url:this.state.baseURL+'/user/checkLogin',
        method:'post',
        headers:this.state.headers[0],
        params:state.form
      }).then(res=>{
        console.log(state.loginMessage)
        if(state.loginMessage.fristLogin == true){
          state.fL = true
          state.loging = false
        }else{
          for(let i in res.data.data){
            state.loginMessage[i] = res.data.data[i]
          }
          console.log(state.loginMessage)
          axios({
            url:this.state.baseURL+'/user/userLogin',
            method:'post',
            headers:this.state.headers[0],
            params:{
              username:state.form.username,
              pswd:state.form.pswd
            }
          }).then(res=>{
            state.userData = res.data.user
            console.log(state.userData)
          })
          state.content = true;
          state.loginView = false;
        }
      }).catch(err=>{
        console.log(err)
      })
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
    
  },
  getters:{

  }
}
export default loginInfo
