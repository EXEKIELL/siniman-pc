import axios from 'axios'
import qs from 'qs'
import router from '../router/index'
//url
var root = 'http://118.24.62.151:8080/snimay_sharing';
var headers = [
  {'Content-Type':'application/x-www-form-urlencoded'},
  {'Content-Type': 'application/json'},
  {'Content-Type': 'raw'}
]

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

// function apiAxios (method, url, params, success, failure) {
//   if (params) {
//     params = filterNull(params)
//   }
//   axios({
//     method: method,
//     url: url,
//     params: method === 'POST' || method === 'DELETE' ? params : null,
//     baseURL: root,
//     headers:method === 'POST'?headers[0]:null,
//     withCredentials: false
//   })
//     .then(function (res) {
//
//     })
//     .catch(function (err) {
//       let res = err.response
//       if (err) {
//         window.alert('api error, HTTP CODE: ' + res.status)
//       }
//     })
// }


function axiosPost(url,index,params,fun) {
  axios({
    method:'post',
    baseURL:root,
    url:url,
    headers:headers[index],
    data:params,
    transformRequest:[function (data) {
      if(index==0){
        Object.keys(data).forEach((key) => {
          if ((typeof data[key]) === 'object') {
            data[key] = JSON.stringify(data[key]) // 这里必须使用内置JSON对象转换
          }
        })
        data = qs.stringify(data) // 这里必须使用qs库进行转换
        return data
      }else{
        data = JSON.stringify(data)
        return data
      }
    }]
  }).then(res=>{
    if(res.data.code!=null&&res.data.code=='1003'){
      router.push('/login')
    }else if(typeof fun=="function"){
      fun(res)
    }
    $('html , body').animate({scrollTop: 0},'fast');
  })
}
function axiosGet(url,params,fun) {
  axios({
    method:'get',
    baseURL:root,
    url:url,
    params:params
  }).then(res=>{
    if(typeof fun=="function"){
      fun(res)
    }
  })
}

// 返回在vue模板中的调用接口
export default {
  axiosPost:axiosPost,
  axiosGet:axiosGet
}

