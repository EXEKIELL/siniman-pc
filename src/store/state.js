import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    content:false,
    loginView:true,
    loginData:{}
  },
  mutations:{
    logined(state){
      // state.content = true
      // state.loginView = false
    }
  }
})
export default store
