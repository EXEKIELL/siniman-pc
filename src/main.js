// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import museUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import './assets/css/reset.css'
import './assets/css/swiper-3.4.2.min.css'
import './assets/js/swiper-3.4.2.min.js'


Vue.config.productionTip = false
Vue.use(museUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  museUi,
  components: { App },
  template: '<App/>'
})
