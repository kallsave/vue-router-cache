import VConsole from 'vconsole'
const env = process.env.NODE_ENV

window.vConsole = new VConsole()

let vConsoleFirst = false

function observeProperty(obj, key, fn) {
  var val = obj[key]
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return val
    },
    set: function (newVal) {
      if (val === newVal) {
        return
      }
      val = newVal
      if (typeof fn === 'function') {
        fn()
      }
    }
  })
}

if (window.vConsole) {
  observeProperty(window.vConsole, 'isInited', function () {
    if (vConsoleFirst) {
      return
    }
    vConsoleFirst = true
    window.vConsole.$dom.style.display = 'none'
  })
}

export function showVConsole() {
  window.setTimeout(() => {
    if (window.vConsole) {
      window.vConsole.$dom.style.display = 'block'
    } else {
      console.log('%cdevelopment close vconsole', 'color:orange')
    }
  }, 500)
}
