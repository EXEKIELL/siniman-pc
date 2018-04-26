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
import IntegralDetail from '@/components/integralDetail'
import MyClientDetail from '@/components/myClientDetail'
import MyPerformaceDetail from '@/components/myPerformaceDetail'
import MyShop from '@/components/myShop'
import MessageXq from '@/components/messageXq'
import MyData from '@/components/myData'
import AccountAssignment from '@/components/accountAssignment'
import MyShopXq from '@/components/myShopXq'
import MyIndent from '@/components/myIndent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/personCenter'
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
    },
    {
      path: '/integralDetail',
      name: 'IntegralDetail',
      component: IntegralDetail
    },
    {
      path: '/myClientDetail',
      name: 'MyClientDetail',
      component: MyClientDetail
    },
    {
      path: '/myPerformaceDetail',
      name: 'MyPerformaceDetail',
      component: MyPerformaceDetail
    },
    {
      path: '/myShop',
      name: 'MyShop',
      component: MyShop
    },
    {
      path: '/messageXq',
      name: 'MessageXq',
      component:MessageXq
    },
    {
      path: '/myData',
      name: 'MyData',
      component: MyData
    },
    {
      path: '/accountAssignment',
      name: 'AccountAssignment',
      component: AccountAssignment
    },
    {
      path: '/myShopXq',
      name: 'MyShopXq',
      component: MyShopXq
    },
    {
      path: '/myIndent',
      name: 'MyIndent',
      component: MyIndent
    }
  ]
})
