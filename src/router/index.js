import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PersonCenter from '@/components/personCenter'
import Login from '@/components/login'
import MyProject from '@/components/myProject'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyProject',
      component: MyProject
    },
    {
      path: '/personCenter',
      name: 'PersonCenter',
      component: PersonCenter
    }
  ]
})
