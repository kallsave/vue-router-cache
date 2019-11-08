import config from './config/index'
import routerCacheHelper from './api/router-cache-helper'
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
  Vue.prototype.$routerCacheHelper = routerCacheHelper
  Vue.component(Component.name, Component)
  routerMiddle(Vue, config)
}

const VuerouterCache = {
  install: install,
}

export default VuerouterCache
