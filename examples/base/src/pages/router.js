import Vue from 'vue'
import Router from 'vue-router'
import TestCaseRoutes from './test-case/routes.js'

Vue.use(Router)

const routes = [
  ...TestCaseRoutes,
]

const router = new Router({
  mode: 'hash',
  routes: routes
})

export default router
