<template>
  <div :class="$style['app']">
    <transition
      :name="transitionName"
      :mode="mode"
      :duration="transitionDuration">
      <router-cache>
        <router-view class="router-view"></router-view>
      </router-cache>
    </transition>
  </div>
</template>

<script>
import { isMobile } from '@/common/helpers/utils.js'

const TRANSITION_DURATION = {
  enter: 350,
  leave: 330
}

export default {
  name: 'App',
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
          } else {
            // replace
            this.transitionName = ''
            this.mode = ''
          }
        }
      },
    }
  }
}
</script>

<style lang="less" module>
@easeOut: cubic-bezier(0.445, 0.05, 0.55, 0.95);
@easeIn: cubic-bezier(0.07, 0.59, 0.26, 0.97);

@easeOut: cubic-bezier(0.445, 0.05, 0.55, 0.95);
@easeIn: cubic-bezier(0.07, 0.59, 0.26, 0.97);

.app {
  position: relative;
  width: 3.75rem;
  height: 100%;
  :global {
    .router-view {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      &.move-right-enter {
        position: fixed;
        z-index: 20;
        height: 100%;
        left: 100%;
      }
      &.move-right-enter-active {
        position: fixed;
        z-index: 20;
        height: 100%;
        transition: left 350ms @easeIn;
      }
      &.move-right-enter-to {
        position: fixed;
        z-index: 20;
        height: 100%;
      }
      &.move-right-leave {
        z-index: 10;
      }
      &.move-right-leave-active {
        z-index: 10;
        transition: left 330ms @easeOut;
      }
      &.move-right-leave-to {
        z-index: 10;
        left: -30%;
      }
      &.move-left-enter {
        z-index: 10;
        left: -30%;
      }
      &.move-left-enter-active {
        z-index: 10;
        transition: left 350ms @easeIn;
      }
      &.move-left-enter-to {
        z-index: 10;
      }
      &.move-left-leave {
        position: fixed;
        z-index: 20;
        height: 100%;
        left: 0%;
      }
      &.move-left-leave-active {
        position: fixed;
        z-index: 20;
        height: 100%;
        left: 100%;
        transition: left 330ms @easeOut;
      }
      &.move-left-leave-to {
        position: fixed;
        z-index: 20;
        height: 100%;
        left: 100%;
      }
    }
  }
}
</style>
