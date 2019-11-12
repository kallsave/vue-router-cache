import config from './config/index'
import routerCache from './api/router-cache'
import Component from './components/router-cache'
import routerMiddle from './router-middle/index'
import { checkInt } from './util/lang'

let isInstalled = false

function install(Vue, options = {}) {
  if (!options.router) {
    console.error('parameter %crouter', 'color: orange', 'is required')
    return
  }
  if (options.max && !checkInt(options.max)) {
    console.error('parameter %cmax', 'color: orange', 'must be an integer')
    return
  }
  if (isInstalled) {
    return
  }
  isInstalled = true
  Object.assign(config, options)
  Vue.prototype.$routerCache = routerCache
  Vue.component(Component.name, Component)
  routerMiddle(Vue, config)
}

const VuerouterCache = {
  install,
  routerCache,
  version: '0.0.1'
}

export default VuerouterCache
