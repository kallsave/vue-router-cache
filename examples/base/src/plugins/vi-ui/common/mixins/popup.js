import visibility from './visibility.js'

export default {
  mixins: [
    visibility
  ],
  props: {
    zIndex: {
      type: Number,
      default: 100
    },
    isShowMask: {
      type: Boolean,
      default: true
    },
  }
}
