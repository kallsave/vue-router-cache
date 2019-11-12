import Style from './common/stylus/index.styl'
import ViPopup from './components/vi-popup/index.js'
import ViCollapse from './components/vi-collapse/index.js'
import ViSwitch from './components/vi-switch/index.js'

const components = [
  ViPopup,
  ViCollapse,
  ViSwitch,
]

function install(Vue) {
  if (install.isInstalled) {
    return
  }
  install.isInstalled = true
  components.forEach((Component) => {
    Component.install(Vue)
  })
}

const ViUi = {
  install,
  version: '0.0.1',
}

export default ViUi
