export default {
  mounted() {
    this.addEventListenerFocus()
    this.addEventListenerBlur()
  },
  methods: {
    addEventListenerFocus() {
      this.$el.addEventListener('focus', this.cachedTop, true)
    },
    addEventListenerBlur() {
      this.$el.addEventListener('blur', this.recoverTop, true)
    },
    removeEventListenerFocus() {
      this.$el.removeEventListener('focus', this.cachedTop, true)
    },
    removeEventListenerBlur() {
      this.$el.removeEventListener('blur', this.recoverTop, true)
    },
    cachedTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop
      this.top = top
    },
    recoverTop(event) {
      const tagNameList = ['INPUT', 'TEXTAREA']
      if (tagNameList.indexOf(event.target.tagName) !== -1) {
        window.scrollTo({
          top: this.top,
          behavior: 'smooth'
        })
      }
    },
  },
  beforeDestroy() {
    this.removeEventListenerFocus()
    this.removeEventListenerBlur()
  }
}
