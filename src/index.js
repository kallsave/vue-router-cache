import config from './config/index'
import routerCache from './api/router-cache'
import Component from './components/router-cache'
import routerMiddle from './router-middle/index'
import { checkInt } from './util/lang'

function install(Vue, options = {}) {
  if (!options.router) {
    console.error('parameter %crouter', 'color: orange', 'is required')
    return
  }
  if (options.max && !checkInt(options.max)) {
    console.error('parameter %cmax', 'color: orange', 'must be an integer')
    return
  }
  if (install.installed) {
    return
  }
  install.installed = true
  Object.assign(config, options)
  Vue.prototype.$routerCache = routerCache
  Vue.component(Component.name, Component)
  routerMiddle(Vue, config)
}

const VuerouterCache = {
  install,
  routerCache,
  version: '0.2.0'
}

export default VuerouterCache
