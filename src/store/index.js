import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

import Login from './modules/login'

const store = new Vuex.Store({
  state:{},
  modules:{
    login:Login
  },
  msgcount:0,
})
export default store
