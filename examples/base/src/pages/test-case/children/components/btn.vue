<template>
  <div :class="$style['btn']">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" module>
@rem: 100rem;

.btn {
  font-size: 16 / @rem;
  color: #fff;
  border-radius: 5 / @rem;
  background: #41b883;
  margin-bottom: 10 / @rem;
  line-height: 30 / @rem;
  text-align: center;
  padding: 10 / @rem;
}
</style>
