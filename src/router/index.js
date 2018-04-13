import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PersonCenter from '@/components/personCenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PersonCenter',
      component: PersonCenter
    }
  ]
})
