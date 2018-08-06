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
var root='http://120.24.212.12:8080/share/';
let headers = [
  {'Content-Type':'application/x-www-form-urlencoded'},
  {'Content-Type': 'application/json'},
  {'Content-Type': 'raw'},
  {'Authorization': 'Basic '+sign_1}
]
// console.log(headers)
function axiosPost(url,index,params,fun) {

}
function axiosGet(url,index,params,fun) {


}

export default {
  axiosPost:axiosPost,
  axiosGet:axiosGet
}
