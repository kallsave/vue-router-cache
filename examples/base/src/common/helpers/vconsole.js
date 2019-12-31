import VConsole from 'vconsole'

const platform = window.navigator.platform

let vConsole

if (!/^(Win|Mac)/i.test(platform)) {
  vConsole = new VConsole()
}

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

if (vConsole) {
  observeProperty(vConsole, 'isInited', function () {
    vConsole.$dom.style.display = 'none'
  })
}

export function showVConsole() {
  if (vConsole) {
    window.setTimeout(() => {
      vConsole.$dom.style.display = 'block'
    }, 1000)
  } else {
    console.log(`%c${platform} platfrom close vconsole`, 'color:orange')
  }
}
