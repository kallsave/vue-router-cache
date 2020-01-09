<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :duration="transitionDuration">
    <router-cache>
      <router-view class="'router-view'"></router-view>
    </router-cache>
  </transition>
</template>

<script>
import routerTransitionMixins from '@/common/mixins/router-transition.js'

export default {
  mixins: [
    routerTransitionMixins,
  ]
}
</script>

<style lang="less" module>
</style>
