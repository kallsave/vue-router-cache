<template>
  <page>
    <vi-scroll
      ref="scroll"
      style="color: #999"
      :data="numberList"
      :options="scrollOptions"
      :scrollEvents="scrollEvents"
      @pulling-down="pullingDownHandler">
      <div :class="$style['number-list']">
        <color-list
          :data="numberList"
          @item-click="clickHandler">
        </color-list>
      </div>
    </vi-scroll>
  </page>
</template>

<script>
import ColorList from './components/color-list.vue'
import { getNumberList } from '@/api/list.js'

export default {
  components: {
    ColorList,
  },
  data() {
    return {
      numberList: [],
      scrollEvents: ['scroll'],
      scrollOptions: {
        probeType: 3,
        click: true,
        pullDownRefresh: {
          // 阀值
          threshold: 80,
          // 滞留的位置
          stop: 60,
          txt: '更新成功',
          stopTime: 1500
        },
        directionLockThreshold: 0,
      },
    }
  },
  mounted() {
    this.$refs.scroll.autoPullDownRefresh()
  },
  methods: {
    pullingDownHandler() {
      this.getNumberList()
    },
    getNumberList() {
      getNumberList().then((res) => {
        if (res.code === 1) {
          this.numberList = res.data
        }
      })
    },
    clickHandler(item) {
      this.$router.push(`/main/number-detail/${item.id}`)
    },
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.number-list {
  box-sizing: border-box;
  height: 100%;
  padding: 10 / @rem;
}
</style>
