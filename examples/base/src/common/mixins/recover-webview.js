import {
  hasData,
} from '@/common/helpers/dom.js'

export default {
  mounted() {
    this.addEventListenerFocus()
    this.addEventListenerBlur()
  },
  methods: {
    addEventListenerFocus() {
      this.$el.addEventListener('focus', this.cacheScrollTop, true)
    },
    addEventListenerBlur() {
      this.$el.addEventListener('blur', this.recoverScrollTop, true)
    },
    removeEventListenerFocus() {
      this.$el.removeEventListener('focus', this.cacheScrollTop, true)
    },
    removeEventListenerBlur() {
      this.$el.removeEventListener('blur', this.recoverScrollTop, true)
    },
    cacheScrollTop() {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    },
    recoverScrollTop(event) {
      const target = event.target
      const tagNameList = ['INPUT', 'TEXTAREA']
      const isNoRollback = hasData(target, 'no-rollback')
      if (tagNameList.indexOf(target.tagName) !== -1 && !isNoRollback) {
        window.scrollTo({
          top: this.scrollTop,
        })
      }
    },
  },
  beforeDestroy() {
    this.removeEventListenerFocus()
    this.removeEventListenerBlur()
  }
}
