import Vue from 'vue'
import Router from 'vue-router'
import MainRoutes from './main/routes.js'
import TestCaseRoutes from './test-case/routes.js'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/main/enter',
  },
  ...MainRoutes,
  ...TestCaseRoutes,
]

const router = new Router({
  mode: 'hash',
  routes: routes
})

export default router
