import Component from './vi-loading.vue'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
}

export default Component
