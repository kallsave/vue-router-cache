<template>
  <page>
    <vi-scroll
      ref="scroll"
      style="color: #999"
      :data="letterList"
      :options="scrollOptions"
      :scrollEvents="scrollEvents"
      @pulling-down="pullingDownHandler">
      <div :class="$style['letter-list']">
        <color-list
          ref="list"
          :data="letterList"
          @item-click="clickHandler">
        </color-list>
      </div>
    </vi-scroll>
  </page>
</template>

<script>
import ColorList from './components/color-list.vue'
import { getLetterList } from '@/api/list.js'

export default {
  components: {
    ColorList,
  },
  data() {
    return {
      letterList: [],
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
  computed: {
    numberId() {
      return this.$route.params.numberId
    }
  },
  mounted() {
    this.$refs.scroll.autoPullDownRefresh()
  },
  methods: {
    pullingDownHandler() {
      this.getLetterList()
    },
    getLetterList() {
      getLetterList(this.numberId).then((res) => {
        if (res.code === 1) {
          this.letterList = res.data
        }
      })
    },
    clickHandler(item) {
      this.$router.push(`/main/letter-detail/${this.numberId}/${item.id}`)
    },
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.letter-list {
  box-sizing: border-box;
  height: 100%;
  padding: 10 / @rem;
}

</style>
