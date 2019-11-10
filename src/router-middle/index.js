import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import {
  BACK,
  FORWARD,
  REPLACE,
  NONE
} from '../history/history-direction-name'
import { defineReactive } from '../util/lang'
import routerCacheHelper from '../api/router-cache-helper'
import config from '../config/index'
import { globalMultiKeyMap } from '../store/index'

let direction = NONE

historyStateEvent.on(BACK, () => {
  direction = BACK
  historyStack.shift()
  config.setHistoryStack(historyStack.getStore())
  const route = config.router.history.current
  if (config.isSingleMode) {
    const key = routerCacheHelper.resolveKeyFromRoute(route)
    routerCacheHelper._remove(key)
  } else {
    const baseKey = routerCacheHelper.resolveKeyFromRoute(route)
    if (globalMultiKeyMap[baseKey]) {
      const key = globalMultiKeyMap[baseKey].shift()
      routerCacheHelper._remove(key)
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
    routerCacheHelper.removeBackInclue(location)
    originPush(location, onComplete, onAbort)
  }

  router.replace = (location, onComplete, onAbort) => {
    direction = REPLACE
    historyStack.shift()
    config.setHistoryStack(historyStack.getStore())
    routerCacheHelper.shift()
    originReplace(location, onComplete, onAbort)
  }

  router.go = (n) => {
    if (n > 0) {
      direction = FORWARD
    } else if (n < -1) {
      direction = BACK
      historyStack.removeBack(-n)
      config.setHistoryStack(historyStack.getStore())
      routerCacheHelper.removeBack(-n)
    }
    originGo(n)
  }

  router.beforeEach((to, from, next) => {
    // let hashchange I/0 event trigger callback before next
    window.setTimeout(() => {
      to.params[directionKey] = direction
      next()
    }, 0)
  })

  defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      const href = window.location.href
      if (direction !== BACK && historyStack.getHeader() !== href) {
        historyStack.pop(href)
        config.setHistoryStack(historyStack.getStore())
      }
      direction = FORWARD
    })
  })
}

export default routerMiddle
