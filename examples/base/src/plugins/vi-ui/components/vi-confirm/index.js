import Component from './vi-confirm.vue'
import create from './api.js'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
  create(Vue, Component)
}

export default Component
