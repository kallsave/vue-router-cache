export function isInt(n) {
  if (n === Infinity) {
    return true
  }
  return typeof n === 'number' && n > 0 && (n | 0) === n
}

export function defineReactive(data, key, fn) {
  let val = data[key]
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
      const oldVal = val
      val = newVal
      typeof fn === 'function' && fn(newVal, oldVal)
    }
  })
}
