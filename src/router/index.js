import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
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
import IndexWrap from '@/components/indexWrap'
import MyCollect from '@/components/myCollect'

import MyReport from '@/components/MyReport'

Vue.use(Router)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/indexWrap/personCenter'
    },
    {
      path: '/indexWrap',
      component: IndexWrap,
      redirect: '/indexWrap/personCenter',
      children:[
        {
          path: '/indexWrap/personCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myProject',
          name: 'MyProject',
          component: MyProject,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/shareProject',
          name: 'ShareProject',
          component: ShareProject,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/shareCommunity',
          name: 'ShareCommunity',
          component: ShareCommunity,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myProjectIndex1',
          name: 'MyProjectIndex1',
          component: MyProjectIndex,

          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myProjectIndex2',
          name: 'MyProjectIndex2',
          component: MyProjectIndex,

          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myProjectIndex3',
          name: 'MyProjectIndex3',
          component: MyProjectIndex,

          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/messageManage',
          name: 'MessageManage',
          component: MessageManage,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/integralDetail',
          name: 'IntegralDetail',
          component: IntegralDetail,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myClientDetail',
          name: 'MyClientDetail',
          component: MyClientDetail,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myPerformaceDetail',
          name: 'MyPerformaceDetail',
          component: MyPerformaceDetail,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myShop',
          name: 'MyShop',
          component: MyShop,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/messageXq',
          name: 'MessageXq',
          component:MessageXq,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myData',
          name: 'MyData',
          component: MyData,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/accountAssignment',
          name: 'AccountAssignment',
          component: AccountAssignment,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myShopXq',
          name: 'MyShopXq',
          component: MyShopXq,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myIndent',
          name: 'MyIndent',
          component: MyIndent,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myCollect',
          name: 'MyCollect',
          component: MyCollect,
          meta:{
            requireAuth:true //是否登录验证
          },
        },
        {
          path: '/indexWrap/myReport',
          name: 'MyReport',
          component: MyReport,
          meta:{
            requireAuth:true //是否登录验证
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let code=to.query.code

  if(code){

    localStorage.setItem('token',code)
    if(localStorage.getItem('sysconfig')==null){
      store.dispatch('login/getSystem');
    }
    store.dispatch('login/getUserInfo');
    next({
      path: '/indexWrap/personCenter',
    })

  }
  if(to.meta.requireAuth){
    if(localStorage.getItem('token')!=null){
      store.dispatch('login/getUserInfo');
      if(!store.state.login.freshState){
        // store.dispatch('login/changeFreshState')
      }
      next()
    }else{
      next({
        path: '/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next()
  }
})

export default router


