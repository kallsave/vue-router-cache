/*
 * @Author: kallsave
 * @Date: 2018-10-15 11:07:37
 * @Last Modified by: kallsave
 * @Last Modified time: 2019-05-21 15:48:31
 */

/**
* '-'转驼峰
*
* @export
* @param {String} str
* @returns
*/
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

  return mulitDeepClone(style, map)
}

export function stylePadPx(style) {
  return styleTogglePx(style, true)
}

export function styleRemovePx(style) {
  return styleTogglePx(style, false)
}

/**
* 数组合并并且去重
*
* @export
* @param {Array, Array...}
* @returns new Array
*/
export function assignArray() {
  let arr = [].concat.apply([], arguments)
  let ret = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (ret.indexOf(arr[i]) !== -1) {
      ret.push(arr[i])
    }
  }
  return ret
}

/**
* 去掉数组中指定的元素
* 第一个参数是需要操作的数组,后面的参数是包含需要去掉的元素的数组
* @export
* @param {Array, Array...}
* @returns new Array
*/
export function spliceArray() {
  let arr = arguments[0]
  let spliceList = [].concat.apply([], [].slice.call(arguments, 1))
  return arr.filter((item) => {
    return spliceList.indexOf(item) === -1
  })
}

export function checkClass(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

export function deepClone(o) {
  let ret
  let instance = checkClass(o)
  if (instance === 'Array') {
    ret = []
  } else if (instance === 'Object') {
    ret = {}
  } else {
    return o
  }

  for (let key in o) {
    let copy = o[key]
    ret[key] = deepClone(copy)
  }

  return ret
}

/**
 *
 * 给target合并key(深度)
 * @export
 * @param {Object} to
 * @param {Object} from
 * @returns
 */
function deepAssign(to, from) {
  for (let key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      deepAssign(to[key], from[key])
    }
  }
}

/**
 * 支持多参数的深度克隆
 * 后面的优先级最大
 * @export
 * @param {Object} target
 * @param {Object} rest
 * @returns
 */
export function mulitDeepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    let source = deepClone(rest[i])
    deepAssign(target, source)
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
    let currentTime = new Date().getTime()
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
