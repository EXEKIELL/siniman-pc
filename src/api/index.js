import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import store01 from '../store/index'
let Base64 = require('js-base64').Base64;
// let store = require('../store/index');
import router from '../router/index';

import {Message} from 'element-ui'

//url
var json01 = JSON.stringify({access_token:''});
var sign_1 = Base64.encode(json01);
// var root='http://120.24.212.12:8080/share/';
var root='http://127.0.0.1:8080/share/';
// var root = window.location.protocol+'//'+window.location.host+'/share/';

//手机端链接，用来生成分享二维码的
let mobileUrl='http://share.hengdikeji.com/mobile/#/HomeProduct';

var headers = [
  {'Content-Type':'application/x-www-form-urlencoded'},
  {'Content-Type': 'application/json'},
  {'Content-Type': 'raw'},
  {'Authorization': 'Basic '+sign_1}
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

function axiosPost(url,index,params,fun) {

  let header={}
  let access_token=getToken()
  let authorization

  if(access_token){
    let Base64 = require('js-base64').Base64
    header.access_token=access_token
    let json=JSON.stringify(header)
    let baseJson=Base64.encode(json)
    authorization=baseJson
  }
  let link=url
  if(authorization){
    link +="?authorization="+authorization
  }

  axios({
    method:'post',
    baseURL:root,
    url:link,
    headers:headers[index],
    data:params,
    dataType:"JSON",
    transformRequest:[function (data) {

      if(authorization){
        data.authorization='Basic '+authorization
      }
      if(index==0 || index==2 ){
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

    if(res.data.status!=null &&  parseInt(res.data.status)===1003){
      router.push('/login')

    }else if(res.data.code!=null&& parseInt(res.data.code)===1003){
      router.push('/login')

    } else if(res.data.status!=null&&parseInt(res.data.status)!==200){
      if(res.data.message){
        Message.error(res.data.message)
      }
      if(res.data.msg){
        Message.error(res.data.msg)
      }
    }

    if(parseInt(res.data.status)===200){
      fun(res)
    }

    // $('html , body').animate({scrollTop: 0},'fast');
  }).catch((error)=>{
    console.log(error)
  })
}
function getToken(){
  let access_token=false
  let data=localStorage.getItem("token")
  if(data){
    access_token=data
  }
  return access_token
}

function getSign(access_token,tmp) {
  return md5(md5(access_token+tmp))
}

function axiosGet(url,params,fun) {
  let header={}
  let access_token=getToken()
  if(access_token){
    let Base64 = require('js-base64').Base64
    header.access_token=access_token
    let json=JSON.stringify(header)
    let baseJson=Base64.encode(json)
    params.Authorization='Basic '+baseJson
  }
  axios({
    method:'get',
    baseURL:root,
    url:url,
    params:params,
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
    if(typeof fun=="function"){
      fun(res)
    }
  })
}


// 返回在vue模板中的调用接口
export default {
  axiosPost:axiosPost,
  axiosGet:axiosGet,
  mobileUrl:mobileUrl,
  baseUrl:root,
  getToken:getToken,
  formatDate (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
      }
    }
    return fmt;
  },
  padLeftZero:function (str) {
    return ('00' + str).substr(str.length);
  },
  getPreMonth:function(date){
      let arr = date.split('-');
      let year = arr[0]; //获取当前日期的年份
      let month = arr[1]; //获取当前日期的月份
      let day = arr[2]; //获取当前日期的日
      let days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      let year2 = year;
      let month2 = parseInt(month) - 1;
      if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = '0' + month2;
      }
      let t2 = year2 + '-' + month2 + '-' + day2;
      return t2;
  },
  getSystemConfig:function(config){
     let str=localStorage.getItem('sysconfig')
    // JSON.stringify
     let configSystem=JSON.parse(str)

     if(configSystem[config]){
       return  configSystem[config].value
     }else{
       return null
     }

  },

}

