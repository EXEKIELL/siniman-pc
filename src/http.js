import axios from 'axios'
import store from './store/index'
import router from './router/index'
import {Loading,Message} from 'element-ui'

axios.defaults.timeout = 100000 //超时时间

//http请求拦截器
var loadinginstace
axios.interceptors.request.use(config=>{
//  element ui Loading 方法
//   loadinginstace = Loading.service({fullscreen:true})
  return config
},error => {
  // loadinginstace.close()
  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})

//http响应拦截器
axios.interceptors.response.use(data=>{
//  响应成功关闭loading
  if(data.data.data && typeof data.data.data == 'string'){
    if(JSON.parse(data.data.data).code && JSON.parse(data.data.data).code == 1003){
      // localStorage.clear();
      router.replace('/login')
      Message.error({
        message: '登录已过期'
      });
    }
  }
  // loadinginstace.close()
  return data
},error => {

  // loadinginstace.close()
  // Message.error({
  //   message: '加载失败'
  // })
  return Promise.reject(error)
})


export default axios
