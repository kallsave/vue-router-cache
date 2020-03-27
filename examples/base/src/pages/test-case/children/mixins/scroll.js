import { isSingleMode } from '@/config.js'

export default {
  activated() {
    if (!isSingleMode) {
      this.pullingDownHandler()
    }
    this.$nextTick(() => {
      this.$refs.scroll.refresh()
    })
  },
  data() {
    return {
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
          stopTime: 400
        },
        directionLockThreshold: 0,
      },
    }
  },
  mounted() {
    this.$refs.scroll.autoPullDownRefresh()
  },
}
