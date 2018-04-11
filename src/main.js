// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAwesomeSwiper from 'vue-awesome-swiper'
import museUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'

Vue.config.productionTip = false
Vue.use(vueAwesomeSwiper)
Vue.use(museUi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vueAwesomeSwiper,
  components: { App },
  template: '<App/>'
})
