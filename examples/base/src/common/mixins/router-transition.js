import '@/common/less/router-transition.less'

import { isMobile } from '@/common/helpers/utils.js'

const TRANSITION_DURATION = {
  enter: 350,
  leave: 330
}

export default {
  data() {
    return {
      transitionName: '',
      mode: '',
      transitionDuration: TRANSITION_DURATION
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (!isMobile) {
          this.transitionName = ''
          this.mode = ''
          this.transitionDuration = {
            enter: 0,
            leave: 0
          }
        } else {
          this.transitionDuration = TRANSITION_DURATION
          if (to.params.direction === 'back') {
            this.transitionName = 'move-left'
            this.mode = ''
          } else if (to.params.direction === 'forward') {
            this.transitionName = 'move-right'
            this.mode = ''
          } else if (to.params.direction === 'replace') {
            // replace
            this.transitionName = ''
            this.mode = ''
          }
        }
      },
    }
  }
}
