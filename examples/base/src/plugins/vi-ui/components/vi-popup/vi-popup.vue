<template>
  <transition
    :name="transitionName"
    :duration="transitionDuration"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div ref="popup"
      class="vi-popup"
      v-show="isVisible"
      :style="inlineStyle"
      @touchmove.prevent>
      <div class="vi-popup-mask"
        @click="maskClick($event)">
        <div class="vi-popup-mask-gray"
          v-show="isShowMask && !$slots.mask"></div>
        <slot name="mask"></slot>
        <template v-if="customMask">
          <div class="vi-popup-custom-mask" v-html="customMask"></div>
        </template>
      </div>
      <div class="vi-popup-content-center"
        v-if="$slots.default">
        <slot></slot>
      </div>
      <template v-if="$slots['custom-content']">
        <slot name="custom-content"></slot>
      </template>
    </div>
  </transition>
</template>

<script>
import popupMixin from '../../common/mixins/popup.js'

const COMPONENT_NAME = 'vi-popup'

const EVENT_MASK_CLICK = 'mask-click'
const EVENT_AFTER_ENTER = 'after-enter'
const EVENT_AFTER_LEAVE = 'after-leave'

export default {
  name: COMPONENT_NAME,
  mixins: [
    popupMixin
  ],
  props: {
    customMask: {
      type: String,
      default: ''
    },
    transitionName: {
      type: String,
      default: ''
    },
    transitionDuration: {
      type: Object,
      default() {
        return {
          enter: 0,
          leave: 0
        }
      }
    },
    // 有input框推荐开启
    isUseAbsolute: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inlineStyle: {
        'z-index': this.zIndex
      },
    }
  },
  methods: {
    _setAbsoluteStyle() {
      if (this.isUseAbsolute) {
        let top = document.documentElement.scrollTop || document.body.scrollTop
        this.inlineStyle['position'] = 'absolute'
        this.inlineStyle['top'] = `${top}px`
        this.inlineStyle['bottom'] = ``
        this.inlineStyle['height'] = `${window.innerHeight}px`
      }
    },
    show() {
      this._setAbsoluteStyle()
      this.isVisible = true
    },
    maskClick(e) {
      this.$emit(EVENT_MASK_CLICK)
    },
    afterEnter() {
      this.$emit(EVENT_AFTER_ENTER)
    },
    afterLeave() {
      this.$emit(EVENT_AFTER_LEAVE)
    }
  },
}
</script>

<style lang="stylus">
@import "../../common/stylus/var/color.styl"
@import "../../common/stylus/var/z-index.styl"

.vi-popup
  position: fixed
  width: inherit
  top: 0
  bottom: 0
  z-index: $z-index-popup
  .vi-popup-mask
    position: absolute
    width: 100%
    height: 100%
  .vi-popup-mask-gray
    position: absolute
    width: 100%
    height: 100%
    background: $color-popup-background
  .vi-popup-content-center
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
</style>
