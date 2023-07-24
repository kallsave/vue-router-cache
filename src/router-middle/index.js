import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import {
  BACK,
  FORWARD,
  REPLACE,
  NONE
} from '../history/history-direction-name'
import { defineReactive } from '../util/lang'
import routerCache from '../api/router-cache'
import config from '../config/index'
import { globalMultiKeyMap } from '../store/index'

let direction = NONE

historyStateEvent.on(BACK, () => {
  direction = BACK
  historyStack.shift()
  config.setHistoryStack(historyStack.getStore())
  const route = config.router.history.current
  if (config.isSingleMode) {
    const key = routerCache.resolveKeyFromRoute(route)
    routerCache._remove(key)
  } else {
    const baseKey = routerCache.resolveKeyFromRoute(route)
    if (globalMultiKeyMap[baseKey]) {
      const key = globalMultiKeyMap[baseKey].shift()
      routerCache._remove(key)
    }
  }
})

historyStateEvent.on(FORWARD, () => {
  direction = FORWARD
})

const routerMiddle = (Vue, config) => {
  const router = config.router
  const directionKey = config.directionKey

  const originPush = router.push.bind(router)
  const originReplace = router.replace.bind(router)
  const originGo = router.go.bind(router)

  router.push = (location, onComplete, onAbort) => {
    direction = FORWARD
    if (config.isSingleMode && routerCache.has(location)) {
      routerCache.removeBackInclue(location)
    }
    originPush(location, onComplete, onAbort)
  }

  router.replace = (location, onComplete, onAbort) => {
    direction = REPLACE
    historyStack.shift()
    config.setHistoryStack(historyStack.getStore())
    routerCache.shift()
    if (config.isSingleMode && routerCache.has(location)) {
      routerCache.removeBackInclue(location)
    }
    originReplace(location, onComplete, onAbort)
  }

  router.go = (n) => {
    if (n > 0) {
      direction = FORWARD
    } else if (n < 0) {
      direction = BACK
      historyStack.removeBackByIndex(-n)
      config.setHistoryStack(historyStack.getStore())
      routerCache.removeBackByIndex(-n)
    }
    originGo(n)
  }

  router.beforeEach((to, from, next) => {
    // let hashchange I/0 event trigger callback before next
    window.setTimeout(() => {
      to.params[directionKey] = direction
      next()
    }, 16)
  })

  defineReactive(router.history, 'current', () => {
    Vue.nextTick(() => {
      const href = document.URL
      if (direction !== BACK && historyStack.getHeader() !== href) {
        historyStack.unshift(href)
        config.setHistoryStack(historyStack.getStore())
      }
      direction = FORWARD
    })
  })
}

export default routerMiddle
