export function checkInt(n) {
  if (n === Infinity) {
    return true
  }
  return typeof n === 'number' && n > 0 && (n | 0) === n
}

export function defineReactive(data, key, val, fn) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val
    },
    set(newVal) {
      if (newVal === val) {
        return
      }
      val = newVal
      typeof fn === 'function' && fn(newVal)
    }
  })
}
