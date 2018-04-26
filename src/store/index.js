import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import Login from './modules/login'

const store = new Vuex.Store({
  state:{
    baseURL:'http://118.24.62.151:8080/snimay_sharing',
    headers:[
      {'Content-Type':'application/x-www-form-urlencoded'}
    ]
  },
  modules:{
    login:Login
  }
})
export default store
