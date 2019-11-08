import './rem.js'
import '@/common/less/index.less'
import Vue from 'vue'
import App from './App'
import router from './router'

import Page from '@/components/page/index.js'

import VueRouterCache from 'vue-router-cache'
import config from './config.js'

Vue.use(Page)
Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  isSingleMode: config.isSingleMode,
  isDebugger: true,
  directionKey: 'direction',
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
