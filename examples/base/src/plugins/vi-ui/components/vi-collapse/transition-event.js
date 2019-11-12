import { prefixStyle } from '../../common/helpers/dom.js'

const TRANSITION = prefixStyle('transition')

export function transitionEvent(duration = 200) {
  return {
    beforeEnter(el) {
      if (!el.dataset) {
        el.dataset = {}
      }
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.style[TRANSITION] = `height ${duration}ms cubic-bezier(.61,0,.44,1), padding-top ${duration}ms cubic-bezier(.61,0,.44,1), padding-bottom ${duration}ms cubic-bezier(.61,0,.44,1)`
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter(el) {
      el.dataset.oldOverflow = el.style.overflow
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px'
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      } else {
        el.style.height = ''
        el.style.paddingTop = el.dataset.oldPaddingTop
        el.style.paddingBottom = el.dataset.oldPaddingBottom
      }

      el.style.overflow = 'hidden'
    },
    afterEnter(el) {
      // for safari: remove class then reset height is necessary
      el.style[TRANSITION] = ''
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
    },
    beforeLeave(el) {
      if (!el.dataset) {
        el.dataset = {}
      }
      el.dataset.oldPaddingTop = el.style.paddingTop
      el.dataset.oldPaddingBottom = el.style.paddingBottom
      el.dataset.oldOverflow = el.style.overflow

      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
    leave(el) {
      if (el.scrollHeight !== 0) {
        // for safari: add class after set height, or it will jump to zero height suddenly, weired
        el.style[TRANSITION] = `height ${duration}ms cubic-bezier(.61,0,.44,1), padding-top ${duration}ms cubic-bezier(.61,0,.44,1), padding-bottom ${duration}ms cubic-bezier(.61,0,.44,1)`
        el.style.height = 0
        el.style.paddingTop = 0
        el.style.paddingBottom = 0
      }
    },
    afterLeave(el) {
      // removeClass(el, 'vi-collapse-transition')
      el.style[TRANSITION] = ''
      el.style.height = ''
      el.style.overflow = el.dataset.oldOverflow
      el.style.paddingTop = el.dataset.oldPaddingTop
      el.style.paddingBottom = el.dataset.oldPaddingBottom
    }
  }
}
