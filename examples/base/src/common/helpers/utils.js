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
  let result = {}
  if (currentUrl.indexOf('?') === -1) {
    return result
  }
  let paramsUrl = currentUrl.replace(/.*\?/g, '')
  if (paramsUrl.length === 0) {
    return result
  }
  let arr = paramsUrl.match(/[^&]+?=[^&]*/g)
  if (arr) {
    for (let i = 0; i < arr.length; i++) {
      let key = decodeURIComponent(arr[i].replace(/(.+?)=(.*)/, '$1'))
      let value = decodeURIComponent(arr[i].replace(/(.+?)=(.*)/, '$2'))
      result[key] = value
    }
  } else {
    return result
  }
  return result
}

export function checkClass(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

function deepClone(o) {
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
export function multiDeepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    let source = deepClone(rest[i])
    deepAssign(target, source)
  }
  return target
}
