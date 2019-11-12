import Style from './common/stylus/index.styl'
import ViPopup from './components/vi-popup/index.js'
import ViSwitch from './components/vi-switch/index.js'
import ViLoading from './components/vi-loading/index.js'
import ViScroll from './components/vi-scroll/index.js'
import ViCollapse from './components/vi-collapse/index.js'
import ViConfirm from './components/vi-confirm/index.js'

const components = [
  ViPopup,
  ViSwitch,
  ViLoading,
  ViScroll,
  ViCollapse,
  ViConfirm,
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
