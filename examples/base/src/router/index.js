import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/main/enter',
  },
  {
    path: '/main/enter',
    name: 'mainEnter',
    component: () => import('@/pages/main/enter.vue')
  },
  {
    path: '/main/number-list',
    name: 'mainNumberList',
    component: () => import('@/pages/main/number-list.vue')
  },
  {
    path: '/main/number-detail/:numberId',
    name: 'mainNumberDetail',
    component: () => import('@/pages/main/number-detail.vue')
  },
  {
    path: '/main/letter-list/:numberId',
    name: 'mainLetterList',
    component: () => import('@/pages/main/letter-list.vue')
  },
  {
    path: '/main/letter-detail/:numberId/:letterId',
    name: 'mainLetterDetail',
    component: () => import('@/pages/main/letter-detail.vue')
  },
]

const router = new Router({
  mode: 'hash',
  routes: routes
})

export default router
