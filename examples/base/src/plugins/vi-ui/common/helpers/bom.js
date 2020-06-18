const DEFAULT_INTERVAL = 100 / 6

let timeStart

export const requestAnimationFrame = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) {
      return window.setTimeout(() => {
        let timestamp = new Date().getTime()
        if (!timeStart) {
          timeStart = timestamp
        }
        let timeCurrent = timestamp - timeStart
        cb(timeCurrent)
      }, DEFAULT_INTERVAL)
    }
})()

export const cancelAnimationFrame = (() => {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      return window.clearTimeout(id)
    }
})()
