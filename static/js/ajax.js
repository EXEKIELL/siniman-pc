import axios from 'axios'
import store from '../../src/store/index'
import router from '../../src/router/index'
import qs from 'qs'
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64;

// console.log(store);
// console.log(router);
// console.log(qs);
// console.log(axios);
console.log(store)
let sign_1;
if(store.state.login.sign_1 == '' && !localStorage.getItem('sign_1')){
  router.push('/login');
}else{
  sign_1 = store.state.login.sign_1 || JSON.parse(localStorage.getItem('sign_1'));
}
// console.log(sign_1);
let root = 'http://localhost:8080/share';
let headers = [
  {'Content-Type':'application/x-www-form-urlencoded'},
  {'Content-Type': 'application/json'},
  {'Content-Type': 'raw'},
  {'Authorization': 'Basic '+sign_1}
]
// console.log(headers)
function axiosPost(url,index,params,fun) {
  let time = Date.parse( new Date() ).toString(),
      sign = md5(md5(store.state.login.token+time));
  params.time = time;
  params.sign = sign;
  // console.log(sign);
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
            data[key] = JSON.stringify(data[key]); // 这里必须使用内置JSON对象转换
          }
        })
        data = qs.stringify(data); // 这里必须使用qs库进行转换
        return data
      }else{
        data = JSON.stringify(data);
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
function axiosGet(url,index,params,fun) {
  let time = Date.parse( new Date() ).toString(),
    sign = md5(md5(store.state.login.token+time));
  params.time = time;
  params.sign = sign;
  console.log(params.time);
  console.log(params.sign);
  axios({
    method:'get',
    baseURL:root,
    headers:headers[index],
    url:url,
    params:params
  }).then(res=>{
    if(typeof fun=="function"){
      fun(res)
    }
  })
}

export default {
  axiosPost:axiosPost,
  axiosGet:axiosGet
}
