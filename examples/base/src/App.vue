<template>
  <div :class="$style['app']">
    <router-cache>
      <router-view class="router-view app"></router-view>
    </router-cache>
  </div>
</template>

<script>

export default {
  name: 'App',
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
