<template>
  <vi-collapse-transition>
    <div ref="loading"
      class="vi-loading"
      v-show="isVisible"
      :style="style">
      <div class="vi-loading-spinner-content"
        :style="{transform: `scale(${scale})`}">
        <i class="vi-loading-spinner" v-for="(item, index) in balde" :key="index"></i>
      </div>
    </div>
  </vi-collapse-transition>
</template>

<script>
import ViCollapseTransition from '../vi-collapse/vi-collapse-transition.js'
import ViCollapse from '../vi-collapse/vi-collapse.vue'
import visibilityMixin from '../../common/mixins/visibility.js'
import { prefixStyle } from '../../common/helpers/dom.js'

const TRANSITIONEND = prefixStyle('transitionend')

const COMPONENT_NAME = 'vi-loading'

const EVENT_SHOW_FINISH = 'show-finish'
const EVENT_HIDE_FINISH = 'hide-finish'

export default {
  name: COMPONENT_NAME,
  components: {
    ViCollapse
  },
  mixins: [visibilityMixin],
  props: {
    value: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      balde: 12,
      isVisible: true
    }
  },
  computed: {
    style() {
      return {
        height: `${50 * this.scale}px`,
      }
    }
  },
  watch: {
    value: {
      handler(newVal) {
        if (newVal) {
          this.show()
        } else {
          this.hide()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this._addEventListener()
  },
  methods: {
    hide() {
      this.hidePromise = new Promise((resolve, reject) => {
        this.isVisible = false
        this.hideResolve = resolve
      })
      return this.hidePromise
    },
    show() {
      this.showPromise = new Promise((resolve, reject) => {
        this.isVisible = true
        this.showResolve = resolve
      })
      return this.showPromise
    },
    _addEventListener() {
      this.$refs.loading && this.$refs.loading.addEventListener(TRANSITIONEND, this.transitionEndCallBack, false)
    },
    _removeEventListener() {
      this.$refs.loading && this.$refs.loading.addEventListener(TRANSITIONEND, this.transitionEndCallBack, false)
    },
    transitionEndCallBack() {
      if (this.isVisible) {
        this.showResolve()
        this.$emit(EVENT_SHOW_FINISH)
      } else {
        this.hideResolve()
        this.$emit(EVENT_HIDE_FINISH)
      }
    }
  },
  beforeDestroy() {
    this._removeEventListener()
    this.showPromise = null
    this.hidePromise = null
    this.hidePromise = null
    this.hideResolve = null
  },

}
</script>

<style lang="stylus">
.vi-loading
  position: relative
  height: 50px
  width: 100%
  overflow: hidden
  .vi-loading-spinner-content
    position: absolute
    width: 50px
    height: 50px
    top: 50%
    left: 50%
    margin-left: -25px
    margin-top: -25px
    .vi-loading-spinner
      position: absolute
      left: 50%
      top: 50%
      width: 3px
      height: 10px
      margin-top: -5px
      margin-left: -1.5px
      border-radius: 1000px
      opacity: .25
      background-color: currentColor
      animation: spinner-fade 1s linear infinite
      for num in (1..12)
        &:nth-child({num})
          animation-delay: (num / 12)s
          transform: rotate(30deg * (num - 6)) translateY(-150%)

@keyframes spinner-fade
    0%
      opacity: .85
    50%
      opacity: .25
    100%
      opacity: .25
</style>
