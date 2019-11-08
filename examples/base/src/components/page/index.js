import Component from './page.vue'

Component.install = function (Vue) {
  Vue.component(Component.name, Component)
}

export default Component
