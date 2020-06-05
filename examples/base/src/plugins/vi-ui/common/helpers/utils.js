/*
 * @Author: kallsave
 * @Date: 2018-10-15 11:07:37
 * @Last Modified by: kallsave
 * @Last Modified time: 2020-06-05 14:02:16
 */

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

// '-'转驼峰
export function camelize(str) {
  str = String(str)
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  })
}

export function pxToNum(str) {
  str = str + ''
  return Number(str.replace(/px/g, ''))
}

export function padPx(num) {
  return `${num}px`
}

export function styleTogglePx(style, mode = true) {
  const list = [
    'width',
    'height',
    'line-height',
    'font-size',
    'left',
    'right',
    'top',
    'bottom',
    'margin-left',
    'margin-right',
    'margin-top',
    'margin-bottom',
    'padding-left',
    'padding-right',
    'padding-top',
    'padding-bottom',
  ]

  const map = {}

  for (let key in style) {
    if (list.indexOf(key) !== -1) {
      if (mode && !isNaN(style[key] - 0)) {
        map[key] = padPx(style[key])
      } else if (!mode) {
        map[key] = pxToNum(style[key])
      }
    }
  }

  return multiDeepClone(style, map)
}

export function stylePadPx(style) {
  return styleTogglePx(style, true)
}

export function styleRemovePx(style) {
  return styleTogglePx(style, false)
}

// 数组合并并且去重
export function assignArray() {
  const arr = [].concat.apply([], arguments)
  const ret = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (ret.indexOf(arr[i]) !== -1) {
      ret.push(arr[i])
    }
  }
  return ret
}

// 去掉数组中指定的元素
// 第一个参数是需要操作的数组,后面的参数是包含需要去掉的元素的数组
export function spliceArray() {
  const arr = arguments[0]
  const spliceList = [].concat.apply([], [].slice.call(arguments, 1))
  return arr.filter((item) => {
    return spliceList.indexOf(item) === -1
  })
}

export function deepClone(value) {
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

// 支持多参数的深度克隆,后面的优先级最大
export function multiDeepClone(target, ...rest) {
  for (let i = 0, len = rest.length; i < len; i++) {
    const mixin = deepClone(rest[i])
    deepAssign(target, mixin)
  }
  return target
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
