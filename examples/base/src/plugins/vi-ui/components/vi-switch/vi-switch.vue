<template>
  <div class="vi-switch">
    <input class="vi-switch-input"
      type="checkbox"
      v-model="checkboxValue"
      :disabled="disabled"
      @change="change" />
    <div class="vi-switch-ui">
      <div class="vi-switch-circle"></div>
    </div>
  </div>
</template>

<script>
const COMPONENT_NAME = 'vi-switch'

const EVENT_CHANGE = 'change'

export default {
  name: COMPONENT_NAME,
  props: {
    value: {
      type: [Boolean, Number],
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      checkboxValue: this.value
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.checkboxValue = newVal
      },
      immediate: true
    }
  },
  methods: {
    change() {
      this.$emit('input', this.checkboxValue)
      this.$emit(EVENT_CHANGE, this.checkboxValue)
    }
  }
}
</script>

<style lang="stylus">

.vi-switch
  display: inline-block
  position: relative
  vertical-align: middle
  .vi-switch-input
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 1
    opacity: 0
    &:checked + .vi-switch-ui
      background-color: #ffe26d
      transition: all 0.4s ease
      border-color: transparent
    &:checked + .vi-switch-ui .vi-switch-circle
      left: 0.8em
      transition: all 0.4s ease 0.1s
  .vi-switch-ui
    position: relative
    width: 1.8em
    height: 1em
    background-color: #fff
    border-radius: 2em
    transition: all 0.1s
    border: 1px solid rgba(0, 0, 0, .1)
    .vi-switch-circle
      position: absolute
      height: 1em
      width: 1em
      background: white
      border-radius: 50%
      box-shadow: 0 1px 2px rgba(0, 0, 0, .4)
      top: 0
      left: 0
      transition: all 0.3s
</style>
