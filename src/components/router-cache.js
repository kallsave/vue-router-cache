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

function hasParentRouterCache(vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.routerCache) {
      return true
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
  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)

    const rawChild = vnode || (slot && slot[0])

    if (hasParentRouterCache(this.$vnode)) {
      return rawChild
    }

    let parent = this.$parent

    let depth = 0
    let inactive = false
    while (parent && parent._routerRoot !== parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++
        }
        if (parent._inactive) {
          inactive = true
        }
      }
      parent = parent.$parent
    }

    const matched = this.$route.matched[depth]

    if (vnode && matched) {
      let key
      if (config.isSingleMode) {
        key = routerCache.resolveKeyFromRoute(matched)
      } else {
        const baseKey = routerCache.resolveKeyFromRoute(matched)
        if (!globalMultiKeyMap[baseKey]) {
          globalMultiKeyMap[baseKey] = new MapStack()
        }
        if (this.$route.params[config.directionKey] !== BACK) {
          key = `${baseKey}_${globalMultiKeyMap[baseKey].getSize()}`
          globalMultiKeyMap[baseKey].unshift(key)
        } else {
          key = globalMultiKeyMap[baseKey].getByIndex(0)
        }
      }
      if (this.cache[key]) {
        if (inactive) {
          vnode.componentInstance = this.oldComponentInstance
        } else {
          vnode.componentInstance = this.cache[key].componentInstance
        }
        if (config.isDebugger) {
          console.log(`using cache key: %c${key}`, 'color: orange')
        }
      } else {
        if (!globalStack.checkFull()) {
          if (!inactive) {
            this.cache[key] = vnode
            this.oldComponentInstance = vnode.componentInstance
          }
        } else {
          const lastKey = globalStack.getFooter()
          routerCache._remove(lastKey)
          if (!inactive) {
            this.cache[key] = vnode
            this.oldComponentInstance = vnode.componentInstance
          }
        }
      }
      globalStack.unshift(key)
      vnode.data.routerCache = true
      vnode.data.keepAlive = true
    }
    if (config.isDebugger) {
      console.log(`all cache key: %c${JSON.stringify(globalStack.getStore())}`, 'color: orange')
    }
    return rawChild
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
