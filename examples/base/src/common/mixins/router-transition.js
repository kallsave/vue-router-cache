import '@/common/less/router-transition.less'

import { isMobile } from '@/common/helpers/utils.js'

const TRANSITION_DURATION = {
  enter: 350,
  leave: 330
}

let currentRoute

function hasChildrenRouterView(vm, mostDepth, depth) {
  for (let i = 0; i < vm.$children.length; i++) {
    const item = vm.$children[i]
    const vnodeData = item.$vnode && item.$vnode.data
    if (vnodeData.routerView) {
      const routerViewDepth = vnodeData.routerViewDepth
      depth = depth !== undefined ? depth : routerViewDepth
      return hasChildrenRouterView(item, routerViewDepth, depth)
    } else {
      return hasChildrenRouterView(item, mostDepth, depth)
    }
  }
  return mostDepth !== undefined && mostDepth !== depth
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
