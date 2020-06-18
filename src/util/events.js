class Events {
  constructor() {
    this.map = {}
  }
  on(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return
    }
    this.map[name] = [fn]
  }
  emit(name, ...args) {
    if (this.map[name]) {
      this.map[name].forEach((fn) => {
        fn(...args)
      })
    }
  }
}

export default Events
