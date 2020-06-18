
<template>
  <vi-popup
    v-show="isVisible"
    transition-name="vi-popup-confirm"
    :is-show-mask="isShowMask"
    :z-index="zIndex"
    :transitionDuration="transitionDuration"
    @mask-click="hide">
    <div class="vi-confirm">
      <div class="vi-confirm-title">{{title}}</div>
      <div class="vi-confirm-text">{{text}}</div>
      <div class="vi-confirm-btn-group">
        <div @click="cancel" class="vi-confirm-btn vi-confirm-btn-cancel">{{cancelText}}</div>
        <div @click="confirm" class="vi-confirm-btn vi-confirm-btn-confirm">{{confirmText}}</div>
      </div>
    </div>
  </vi-popup>
</template>

<script>
import visibilityMixin from '../../common/mixins/visibility.js'
import ViPopup from '../vi-popup/vi-popup.vue'

const COMPONENT_NAME = 'vi-confirm'

export const EVENT_CONFIRM = 'confirm'
export const EVENT_CANCEL = 'cancel'

export default {
  name: COMPONENT_NAME,
  components: {
    ViPopup
  },
  mixins: [
    visibilityMixin
  ],
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    isShowMask: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 100
    },
  },
  data() {
    return {
      transitionDuration: {
        enter: 400,
        leave: 400
      }
    }
  },
  methods: {
    cancel() {
      this.hide()
      this.$emit(EVENT_CANCEL)
    },
    confirm() {
      this.hide()
      this.$emit(EVENT_CONFIRM)
    }
  }
}
</script>

<style lang="stylus">
.vi-confirm
  width: 300px
  border-radius: 10px
  background: #fff
  .vi-confirm-title
    padding: 20px 10px
    line-height: 22px
    text-align: center
    font-size: 16px
    color: #666
    word-wrap: break-word
    word-break: break-all
  .vi-confirm-text
    padding: 0 15px
    line-height: 22px
    text-align: center
    font-size: 14px
    color: #999
    margin-bottom: 20px
    word-wrap: break-word
    word-break: break-all
  .vi-confirm-btn-group
    display: flex
    align-items: center
    text-align: center
    font-size: 16px
    .vi-confirm-btn
      flex: 1
      line-height: 48px
      border-top: 1px solid #eee
    .vi-confirm-btn-cancel
      border-right: 1px solid #eee
    .vi-confirm-btn-confirm
      color: #f90

.vi-popup-confirm-enter-active
  animation-name: vi-popup-confirm-enter
  animation-duration: 400ms
  animation-direction: normal
  animation-fill-mode: forwards
  .vi-confirm
    animation-name: vi-confirm-zoom
    animation-duration: 400ms
    animation-direction: normal
    animation-fill-mode: forwards

.vi-popup-confirm-leave-active
  animation-name: vi-popup-confirm-leave
  animation-duration: 400ms
  animation-direction: normal
  animation-fill-mode: forwards

@keyframes vi-popup-confirm-enter
  0%
    opacity: 0
  100%
    opacity: 1

@keyframes vi-popup-confirm-leave
  0%
    opacity: 1
  100%
    opacity: 0

@keyframes vi-confirm-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
