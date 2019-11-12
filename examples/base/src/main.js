import './rem.js'
import '@/common/less/index.less'
import { isSingleMode } from '@/config.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouterCache from 'vue-router-cache'
import ViUi from '@/plugins/vi-ui/index'
import Page from '@/components/page/index.js'

Vue.use(ViUi)
Vue.use(Page)
console.log(isSingleMode)

Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  isSingleMode: isSingleMode,
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
