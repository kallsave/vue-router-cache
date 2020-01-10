<template>
  <vi-page>
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
  </vi-page>
</template>

<script>
import ColorList from './components/color-list.vue'
import { getLetterList } from '@/api/list.js'
import scrollMixins from './mixins/scroll.js'

export default {
  components: {
    ColorList,
  },
  mixins: [
    scrollMixins
  ],
  data() {
    return {
      letterList: [],
    }
  },
  computed: {
    numberId() {
      return this.$route.params.numberId
    }
  },
  methods: {
    pullingDownHandler() {
      this.getLetterList()
    },
    getLetterList() {
      getLetterList(this.numberId).then((res) => {
        if (res.data && res.data.code === 1) {
          this.letterList = res.data.data
        }
      })
    },
    clickHandler(item) {
      this.$router.push({
        name: 'testCaseLetterDetail',
        params: {
          numberId: this.numberId,
          letterId: item.id
        }
      })
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
