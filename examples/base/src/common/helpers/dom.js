import { camelize, hasOwn } from './utils.js'

export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

export function hasData(el, name) {
  const prefix = 'data-'
  return el.hasAttribute(prefix + name)
}

export function getData(el, name) {
  const prefix = 'data-'
  return el.getAttribute(prefix + name)
}

export function setData(el, name, value) {
  const prefix = 'data-'
  el.setAttribute(prefix + name, value)
}

// getRect是获取相对父元素的位置,如果想获取相对页面的位置
// 请使用getBoundingClientRect
export function getRect(el) {
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

const elementStyle = document.createElement('div').style

const endEventListenerList = ['transitionend', 'animationend']

const browserPrefix = {
  standard: '',
  webkit: 'webkit',
  Moz: 'Moz',
  O: 'O',
  ms: 'ms',
}

const endEventListenerPrefixList = {
  transition: {
    transition: 'transitionend',
    webkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd',
    msTransition: 'msTransitionEnd'
  },
  animation: {
    animation: 'animationend',
    webkitAnimation: 'webkitAnimationEnd',
    MozAnimation: 'animationend',
    OAnimation: 'oAnimationEnd',
    msAnimation: 'msAnimationEnd'
  }
}

export function prefixStyle(style) {
  let baseStyle = ''
  if (endEventListenerList.indexOf(style) !== -1) {
    baseStyle = style.replace(/end/i, '')
  }

  for (const key in browserPrefix) {
    if (baseStyle) {
      const cssPrefixStyle = browserPrefix[key] ? browserPrefix[key] + '-' + baseStyle : baseStyle
      const keyName = camelize(cssPrefixStyle)
      if (hasOwn(elementStyle, keyName)) {
        return endEventListenerPrefixList[baseStyle][keyName]
      }
    } else {
      const cssPrefixStyle = browserPrefix[key] ? browserPrefix[key] + '-' + style : style
      const keyName = camelize(cssPrefixStyle)
      if (hasOwn(elementStyle, keyName)) {
        return keyName
      }
    }
  }
  return ''
}

export function getMatchedTarget(e, targetClassName) {
  let el = e.target
  while (el && !hasClass(el, targetClassName)) {
    if (el === e.currentTarget) {
      return null
    }
    el = el.parentNode
  }
  return el
}

export function dispatchEvent(el, name, { type = 'Event', bubbles = true, cancelable = true } = {}) {
  const e = document.createEvent(type)
  e.initEvent(name, bubbles, cancelable)
  el.dispatchEvent(e)
}
