const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

function isObject(value) {
  return value !== null && typeof value === 'object'
}

export const MOBILE_MAX_SIZE = 640

export const UA = window.navigator.userAgent.toLowerCase()

export let isMobile = checkIsMobile() || checkIsMobileSize()

export function checkIsMobile() {
  return !!UA.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}

export function checkIsMobileSize() {
  return window.innerWidth < MOBILE_MAX_SIZE
}

window.addEventListener('resize', () => {
  // basic data type in ES6 modules is strong binding
  isMobile = checkIsMobile() || checkIsMobileSize()
}, false)

export function getUrlParams(currentUrl = window.location.href) {
  const result = {}
  if (currentUrl.indexOf('?') === -1) {
    return result
  }
  const paramsUrl = currentUrl.replace(/.*\?/g, '')
  const arr = paramsUrl.match(/[^&]+?=[^&]*/g)
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      const reg = new RegExp(`(.+?)=(.*)`)
      reg.exec(arr[i])
      const key = decodeURIComponent(RegExp.$1)
      const value = decodeURIComponent(RegExp.$2)
      result[key] = value
    }
  }
  return result
}

// 深度克隆
function deepClone(value) {
  let ret
  const type = toRawType(value)
  if (type === 'Object') {
    ret = {}
  } else if (type === 'Array') {
    ret = []
  } else {
    return value
  }

  for (const key in value) {
    const copy = value[key]
    value[key] = deepClone(copy)
  }

  return ret
}

// 深度合并
function deepAssign(origin, mixin) {
  for (const key in mixin) {
    const targetValue = origin[key]
    const mixinValue = mixin[key]
    if (!hasOwn(origin, key)) {
      origin[key] = mixinValue
    } else if (
      isObject(targetValue) &&
      isObject(mixinValue) &&
      toRawType(targetValue) === toRawType(mixinValue)
    ) {
      deepAssign(targetValue, mixinValue)
    }
  }
}

export function multiDeepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    const source = deepClone(rest[i])
    deepAssign(target, source)
  }
  return target
}

export function camelize(str) {
  str = String(str)
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  })
}

const DEFAULT_TIME_SLICE = 400

export class Debounce {
  constructor(timeSlice = DEFAULT_TIME_SLICE) {
    this.timeSlice = timeSlice
  }
  run(func) {
    if (typeof func === 'function') {
      if (this.timer) {
        window.clearTimeout(this.timer)
      }
      this.timer = window.setTimeout(func, this.timeSlice)
    }
  }
  destroy() {
    window.clearTimeout(this.timer)
    this.timer = null
    this.timeSlice = null
  }
}

export class Throttle {
  constructor(timeSlice = DEFAULT_TIME_SLICE) {
    this.timeSlice = timeSlice
  }
  run(func, overload) {
    const currentTime = new Date().getTime()
    if (!this.lastTime || currentTime - this.lastTime > this.timeSlice) {
      this.lastTime = currentTime
      if (typeof func === 'function') {
        func()
      }
    } else {
      if (typeof overload === 'function') {
        overload()
      }
    }
  }
  destroy() {
    this.timeSlice = null
    this.lastTime = null
  }
}
