<template>
  <div :class="$style['app']">
    <transition
      :name="transitionName"
      :mode="transitionMode"
      :duration="transitionDuration">
      <router-view class="router-view app"></router-view>
     </transition>
  </div>
</template>

<script>
import routerTransitionMixins from '@/common/mixins/router-transition.js'

export default {
  name: 'App',
  mixins: [
    routerTransitionMixins,
  ]
}
</script>

<style lang="less" module>
@rem: 200rem;

.app {
  position: relative;
  width: 750 / @rem;
  height: 100%;
}
</style>
