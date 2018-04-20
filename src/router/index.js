import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PersonCenter from '@/components/personCenter'
import Login from '@/components/login'
import MyProject from '@/components/myProject'
import ShareProject from '@/components/shareProject'
import ShareCommunity from '@/components/shareCommunity'
import MyProjectIndex from '@/components/myProjectIndex'
import MessageManage from '@/components/messageManage'

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
    },
    {
      path: '/myProject',
      name: 'MyProject',
      component: MyProject
    },
    {
      path: '/shareProject',
      name: 'ShareProject',
      component: ShareProject
    },
    {
      path: '/shareCommunity',
      name: 'ShareCommunity',
      component: ShareCommunity
    },
    {
      path: '/myProjectIndex',
      name: 'MyProjectIndex',
      component: MyProjectIndex
    },
    {
      path: '/messageManage',
      name: 'MessageManage',
      component: MessageManage
    }
  ]
})
