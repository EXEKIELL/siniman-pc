// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import store from './store/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import './assets/css/swiper-3.4.2.min.css'
import './assets/js/swiper-3.4.2.min.js'
import ajax from '../static/js/ajax'
import api from './api/index'
import axios from './http'
import qs from 'qs'
import md5 from 'js-md5'
let Base64 = require('js-base64').Base64;


Vue.prototype.$qs = qs;
Vue.prototype.$api = api;
Vue.prototype.$axios = axios;
Vue.prototype.$ajax = ajax;
Vue.prototype.$md5 = md5;
Vue.prototype.$Base64 = Base64;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(store);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
