import '@/common/less/router-transition.less'

import { isMobile } from '@/common/helpers/utils.js'

const TRANSITION_DURATION = {
  enter: 350,
  leave: 330
}

let currentRoute

function getInnerMostRouterDepth(vm, depth) {
  for (let i = 0; i < vm.$children.length; i++) {
    const item = vm.$children[i]
    const vnodeData = item.$vnode && item.$vnode.data
    if (vnodeData.routerView) {
      return getInnerMostRouterDepth(item, vnodeData.routerViewDepth)
    } else {
      return getInnerMostRouterDepth(item, depth)
    }
  }
  return depth
}

function getRouterDepth(vm) {
  for (let i = 0; i < vm.$children.length; i++) {
    const item = vm.$children[i]
    const vnodeData = item.$vnode && item.$vnode.data
    if (vnodeData.routerView) {
      return vnodeData.routerViewDepth
    } else {
      return getRouterDepth(item)
    }
  }
}

export default {
  data() {
    return {
      transitionName: '',
      transitionMode: '',
      transitionDuration: TRANSITION_DURATION
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        currentRoute = to
        if (!isMobile) {
          this.transitionName = ''
          this.transitionMode = ''
          this.transitionDuration = {
            enter: 0,
            leave: 0
          }
        } else {
          // const innerRouterDepth = getInnerMostRouterDepth(this)
          // const routerDepth = getRouterDepth(this)
          // if (innerRouterDepth !== routerDepth) {
          //   return
          // }
          this.transitionDuration = TRANSITION_DURATION
          if (to.params.direction === 'back') {
            this.transitionName = 'move-left'
            this.transitionMode = ''
          } else if (to.params.direction === 'forward') {
            this.transitionName = 'move-right'
            this.transitionMode = ''
          } else if (to.params.direction === 'replace') {
            // replace
            this.transitionName = ''
            this.transitionMode = ''
          }
        }
      },
    }
  }
}
