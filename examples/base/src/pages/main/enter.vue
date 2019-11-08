<template>
  <page>
    <div :class="$style['enter']">
      <div class="btn" @click="pageTurnNumberList">开始尝试</div>
    </div>
  </page>
</template>

<script>
export default {
  methods: {
    pageTurnNumberList() {
      this.$router.push({
        name: 'mainNumberList',
      })
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.enter {
  box-sizing: border-box;
  height: 100%;
  padding: 30 / @rem 10 / @rem;
  :global {
    .btn {
      font-size: 16 / @rem;
      color: #fff;
      border-radius: 5 / @rem;
      background: #41b883;
      margin-bottom: 10 / @rem;
      height: 50 / @rem;
      line-height: 50 / @rem;
      text-align: center;
    }
  }
}
</style>
