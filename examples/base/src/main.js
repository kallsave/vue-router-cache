import './rem.js'
import '@/common/less/index.less'
import { isSingleMode } from '@/config.js'
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouterCache from 'vue-router-cache'
import ViUi from '@/plugins/vi-ui/index'

Vue.use(ViUi)

Vue.use(VueRouterCache, {
  router: router,
  max: 2,
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
Vue.prototype.$global = {}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeMount() {
    // this.createGlobalConfirmApi()
  },
  methods: {
    createGlobalConfirmApi() {
      // DEV: fixed create-api bug
      this.$global.confirm = this.$createViConfirm({})

      const originShow = this.$global.confirm.show

      this.$global.confirm.show = function (props) {
        if (props) {
          this.$updateProps(props)
        }
        originShow()
      }
    }
  }
})
