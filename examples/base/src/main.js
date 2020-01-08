import { showVConsole } from '@/common/helpers/vconsole.js'
import './rem.js'
import '@/common/less/index.less'
import Vue from 'vue'
import App from './App'
import router from './pages/router.js'
import store from './store/index.js'
import VueRouterCache from 'vue-router-cache'
import ViUi from '@/plugins/vi-ui/index.js'
import { isSingleMode } from '@/config.js'
import { getUrlParams } from '@/common/helpers/utils.js'

// ios的输入框失焦,webview无法回弹的hack
import recoverWebviewMixin from '@/common/mixins/recover-webview.js'

Vue.use(ViUi)

Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  isSingleMode: isSingleMode,
  isDebugger: false,
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
  store,
  components: { App },
  template: '<App/>',
  mixins: [
    recoverWebviewMixin
  ],
  beforeMount() {
    this.createGlobalConfirmApi()
    this.showVConsole()
  },
  methods: {
    showVConsole() {
      const urlParams = getUrlParams()
      if (urlParams.hasOwnProperty('vconsole')) {
        showVConsole()
      }
    },
    createGlobalConfirmApi() {
      // DEV: vue-create-api $update
      const defaultOptions = {}
      this.$global.confirm = this.$createViConfirm(defaultOptions)

      const originShow = this.$global.confirm.show

      this.$global.confirm.show = (options) => {
        if (options) {
          this.$createViConfirm({
            ...options
          })
        }
        originShow()
      }
    }
  }
})
