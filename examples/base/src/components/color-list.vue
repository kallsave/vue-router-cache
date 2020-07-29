<template>
  <div :class="$style['list']">
    <div
      ref="item"
      class="item"
      :id="`item${index}`"
      v-for="(item, index) in data"
      :key="item.id"
      :style="setStyle(index, item)"
      @click="clickHandler(item, index)"
      @animationend="animationend(index)">
      <div class="text">id: {{item.id}}</div>
      <div class="text">text: {{item.text}}</div>
      <div class="text" v-if="item.children">子项长度: {{item.children.length}}</div>
    </div>
  </div>
</template>

<script>
const EVENT_ITEM_CLICK = 'item-click'

export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isFinishAnimation: false
    }
  },
  computed: {
    setStyle(index, item) {
      return (index, item) => {
        return {
          background: item.background,
          animation: !this.isFinishAnimation ? `${this.$style['list-load']} ${index * 200 + 400}ms` : 'none'
        }
      }
    },
  },
  methods: {
    animationend(index) {
      if (index === this.data.length - 1) {
        this.isFinishAnimation = true
      }
    },
    clickHandler(item, index) {
      this.$refs.item[index].style.background = 'gold'
      this.isFinishAnimation = true
      this.$emit(EVENT_ITEM_CLICK, item, index)
    }
  },
}
</script>

<style lang="less" module>
@rem: 100rem;

.list {
  :global {
    .item {
      box-sizing: border-box;
      margin-bottom: 10 / @rem;
      height: 120 / @rem;
      border-radius: 6 / @rem;
      text-align: center;
      padding: 10 / @rem 0;
      .text {
        font-size: 20 / @rem;
        line-height: 30 / @rem;
        color: #fff;
      }
    }
  }
}

@keyframes list-load {
  0% {
    transform: translateY(100px)
  }
  100% {
    transform: translateY(0px)
  }
}
</style>
