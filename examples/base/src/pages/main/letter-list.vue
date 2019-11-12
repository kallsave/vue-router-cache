<template>
  <page>
    <div :class="$style['letter-list']">
      <color-list
        ref="list"
        :data="letterList"
        @item-click="clickHandler">
      </color-list>
    </div>
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
    }
  },
  computed: {
    numberId() {
      return this.$route.params.numberId
    }
  },
  mounted() {
    this.getLetterList()
  },
  methods: {
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
  padding: 30 / @rem 10 / @rem;
}

</style>
