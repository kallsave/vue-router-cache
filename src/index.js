import config from './config/index'
import routerCache from './api/router-cache'
import Component from './components/router-cache'
import routerMiddle from './router-middle/index'
import { checkInt } from './util/lang'
import { error } from './util/log'

function install(Vue, options = {}) {
  if (!options.router) {
    error('parameter router is required')
    return
  }
  if (!checkInt(options.max)) {
    error('parameter max must be an integer')
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
  version: 'VERSION'
}

export default VuerouterCache
