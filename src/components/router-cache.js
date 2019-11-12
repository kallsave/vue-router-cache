import { MapStack } from '../util/stack'
import historyStateEvent from '../history/history-state-event'
import { BACK } from '../history/history-direction-name'
import { globalCache, globalStack, globalMultiKeyMap } from '../store/index'
import routerCache from '../api/router-cache'
import config from '../config/index'

function isDef(v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

const COMPONENT_NAME = 'router-cache'

export default {
  name: COMPONENT_NAME,
  abstract: true,
  created() {
    this.cache = Object.create(null)
    globalCache.push({
      cache: this.cache,
    })
  },
  render(h) {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    if (vnode) {
      let key
      if (config.isSingleMode) {
        key = routerCache.resolveKeyFromRoute(this.$route)
      } else {
        const baseKey = routerCache.resolveKeyFromRoute(this.$route)
        if (!globalMultiKeyMap[baseKey]) {
          globalMultiKeyMap[baseKey] = new MapStack()
        }
        if (this.$route.params[config.directionKey] !== BACK) {
          key = `${baseKey}_${globalMultiKeyMap[baseKey].getSize()}`
          globalMultiKeyMap[baseKey].pop(key)
        } else {
          key = globalMultiKeyMap[baseKey].getByIndex(0)
        }
      }
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
        if (config.isDebugger) {
          console.log(`using cache key: %c${key}`, 'color: orange')
        }
      } else {
        if (!globalStack.checkFull()) {
          this.cache[key] = vnode
        } else {
          const lastKey = globalStack.getFooter()
          routerCache._remove(lastKey)
          this.cache[key] = vnode
        }
      }
      globalStack.pop(key)
      vnode.data.keepAlive = true
    }
    if (config.isDebugger) {
      console.log(`all cache key: %c${JSON.stringify(globalStack.getStore())}`, 'color: orange')
    }
    return vnode || (slot && slot[0])
  },
  beforeDestroy() {
    for (const key in this.cache) {
      routerCache._remove(key)
    }
    let index
    for (let i = 0; i < globalCache.length; i++) {
      if (this.cache === globalCache[i]) {
        index = i
        break
      }
    }
    globalCache.splice(index, 1)
  },
}
