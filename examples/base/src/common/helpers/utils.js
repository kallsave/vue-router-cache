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

export function checkClass(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

function _deepClone(o) {
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
    ret[key] = _deepClone(copy)
  }

  return ret
}

/**
 * @export
 * @param {Object} to
 * @param {Object} from
 * @returns
 */
export function _deepAssign(to, from) {
  for (let key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      _deepAssign(to[key], from[key])
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
export function deepClone(target, ...rest) {
  for (let i = 0; i < rest.length; i++) {
    let source = _deepClone(rest[i])
    _deepAssign(target, source)
  }
  return target
}
