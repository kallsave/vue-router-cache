export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isVisible: this.value
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
      }
    }
  },
  methods: {
    hide() {
      this.isVisible = false
    },
    show() {
      this.isVisible = true
    }
  }
}
