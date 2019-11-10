import { globalCache, globalStack } from '../store/index'
import config from '../config/index'

const routerCacheHelper = {
  resolveKeyFromRoute(route) {
    return route.name ? route.name : route.path
  },
  resolveKeyFromLocation(location) {
    const router = config.router
    const route = router.resolve(location).route
    return this.resolveKeyFromRoute(route)
  },
  removeGlobalCacheFromItem(removeItem) {
    for (let i = 0; i < globalCache.length; i++) {
      const globalCacheItem = globalCache[i]
      const cache = globalCacheItem.cache
      if (cache[removeItem]) {
        cache[removeItem].componentInstance.$destroy()
        cache[removeItem] = null
      }
    }
  },
  removeGlobalCacheFromList(removeList) {
    for (let i = 0; i < removeList.length; i++) {
      const removeItem = removeList[i]
      this.removeGlobalCacheFromItem(removeItem)
    }
  },
  shift() {
    const removeItem = globalStack.shift()
    if (removeItem) {
      this.removeGlobalCacheFromItem(removeItem)
    }
  },
  _remove(key) {
    const removeList = globalStack.remove(key)
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    }
  },
  remove() {
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      const key = this.resolveKeyFromLocation(item)
      this._remove(key)
    }
  },
  _removeUntil(key) {
    const removeList = globalStack.removeUntil(key)
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    } else {
      this.removeAll()
    }
  },
  removeUntil(location) {
    const key = this.resolveKeyFromLocation(location)
    this._removeUntil(key)
  },
  _removeExclude() {
    const removeList = globalStack.removeExclude(...arguments)
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    }
  },
  removeExclude() {
    const excludeList = []
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      const key = this.resolveKeyFromLocation(item)
      excludeList.push(key)
    }
    this._removeExclude(...excludeList)
  },
  removeBackByIndex(index) {
    const removeList = globalStack.removeBackByIndex(index)
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    }
  },
  _removeBackInclue(key) {
    const removeList = globalStack.removeBackInclue(key)
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    }
  },
  removeBackInclue(location) {
    const key = this.resolveKeyFromLocation(location)
    this._removeBackInclue(key)
  },
  removeAll() {
    const removeList = globalStack.removeAll()
    if (removeList.length) {
      this.removeGlobalCacheFromList(removeList)
    }
  },
  getStore() {
    return {
      cache: globalCache,
      stack: globalStack.getStore()
    }
  },
}

export default routerCacheHelper
