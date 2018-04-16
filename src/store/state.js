import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    content:true,
    loginView:false
  },
  mutations:{
    logined(state){
      state.content = true
    }
  }
})
export default store
