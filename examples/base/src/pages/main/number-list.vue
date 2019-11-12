<template>
  <page>
    <div :class="$style['number-list']">
      <color-list
        :data="numberList"
        @item-click="clickHandler">
      </color-list>
    </div>
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
    }
  },
  mounted() {
    this.getNumberList()
  },
  methods: {
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
  padding: 30 / @rem 10 / @rem;
}

</style>
