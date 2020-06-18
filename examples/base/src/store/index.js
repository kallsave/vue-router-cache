import Vue from 'vue'
import Vuex from 'vuex'
import local from './cache/local-storage/index.js'
import createPersistedState from 'vuex-persistedstate'

// modules 路由动画名称
import routerTransition from './modules/router-transition/router-transition.js'

// 不需要vuex-persistedstate做可持续化的mutations
const persistedstateIgnoreMutations = [
  // 路由动画
  'SET_ROUTER_TRANSITION_NAME',
  'SET_ROUTER_TRANSITION_MODE',
  'SET_ROUTER_TRANSITION_DURATION',
]

// 储存一周
const TIME_SLICE = 7 * 24 * 60 * 60 * 1000

const VuexPlugins = [
  createPersistedState({
    key: 'vuex',
    filter(mutations) {
      // 过滤掉
      if (persistedstateIgnoreMutations.indexOf(mutations.type) !== -1) {
        return false
      }
      return true
    },
    getState(key) {
      return local.get(key)
    },
    setState(key, value) {
      local.set(key, value, new Date().getTime() + TIME_SLICE)
    },
  })
]

// const debug = false
const debug = process.env.NODE_ENV !== 'production'

// if (debug) {
//   const createLogger = require('vuex/dist/logger')()
//   VuexPlugins.push(createLogger)
// }

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    routerTransition,
  },
  strict: debug,
  plugins: VuexPlugins
})

export default store
