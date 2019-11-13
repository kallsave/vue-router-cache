import Component from './vi-page.vue'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
}

export default Component
