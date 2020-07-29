<template>
  <vi-page>
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
  </vi-page>
</template>

<script>
import ColorList from '@/components/color-list.vue'
import { getNumberList } from '@/api/list.js'
import scrollMixins from './mixins/scroll.js'
/* eslint-disable */
import VueRouterCache from 'vue-router-cache'

export default {
  beforeRouteEnter(to, from, next) {
    // VueRouterCache.routerCache.skip()
    next()
  },
  components: {
    ColorList,
  },
  mixins: [
    scrollMixins,
  ],
  data() {
    return {
      numberList: [],
    }
  },
  methods: {
    pullingDownHandler() {
      this.getNumberList()
    },
    getNumberList() {
      getNumberList().then((res) => {
        if (res.data && res.data.code === 1) {
          this.numberList = res.data.data
        }
      })
    },
    clickHandler(item) {
      this.$router.push({
        name: 'testCaseNumberDetail',
        params: {
          numberId: item.id
        }
      })
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
