import Component from './vi-popup.vue'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
}

export default Component
