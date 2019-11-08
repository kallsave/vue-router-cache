export class Stack {
  constructor(max = Infinity) {
    this.max = max
    this.init()
  }
  init() {
    this.list = []
  }
  _add(item) {
    this.list.unshift(item)
    if (this.list.length > this.max) {
      return this.list.pop()
    }
    return null
  }
  add() {
    const removeList = []
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      const removeItem = this._add(item)
      if (removeItem) {
        removeList.push(removeItem)
      }
    }
    return removeList
  }
  reduce() {
    if (this.list.length) {
      return this.list.shift()
    }
    return null
  }
  _remove(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      return this.list.splice(index, 1)[0]
    }
    return null
  }
  remove() {
    const removeList = []
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      const removeItem = this._remove(item)
      if (removeItem) {
        removeList.push(removeItem)
      }
    }
    return removeList
  }
  removeByIndex(index) {
    if (this.list[index]) {
      return this.list.splice(index, 1)[0]
    }
    return null
  }
  removeUntil(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      return this.list.splice(0, index)
    }
    return []
  }
  removeExclude() {
    const removeList = []
    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i]
      if (Array.prototype.indexOf.call(arguments, item) === -1) {
        const remove = this.list.splice(i, 1)[0]
        Array.prototype.push.call(removeList, remove)
        i--
      }
    }
    return removeList
  }
  removeBackByIndex(index) {
    if (index > this.list.length - 1) {
      return this.list.splice(0)
    }
    return this.list.splice(0, index)
  }
  removeBackInclue(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      return this.list.splice(0, index + 1)
    }
    return []
  }
  removeAll() {
    return this.list.splice(0)
  }
  replace(item) {
    const removeItem = this.reduce()
    if (removeItem) {
      this._add(item)
      return removeItem
    }
    return null
  }
  getHeader() {
    return this.list[0]
  }
  getByIndex(index) {
    return this.list[index]
  }
  getFooter() {
    return this.list[this.list.length - 1]
  }
  getSize() {
    return this.list.length
  }
  getStore() {
    return this.list
  }
  getMax() {
    return this.max
  }
  has(item) {
    return this.list.indexOf(item) !== -1
  }
  updateSize(max) {
    this.max = max
  }
  checkFull() {
    return this.max === this.list.length
  }
}

export class MapStack extends Stack {
  _add(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      this.list.splice(index, 1)
    }
    this.list.unshift(item)
    if (this.list.length > this.max) {
      return this.list.pop()
    }
    return null
  }
}
