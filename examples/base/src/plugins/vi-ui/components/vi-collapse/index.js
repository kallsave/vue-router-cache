import ViCollapse from './vi-collapse.vue'
import ViCollapseTransition from './vi-collapse-transition.js'
import ViCollapseTransitionGroup from './vi-collapse-transition-group.js'

ViCollapse.install = function (Vue) {
  Vue.component(ViCollapse.name, ViCollapse)
  Vue.component(ViCollapseTransition.name, ViCollapseTransition)
  Vue.component(ViCollapseTransitionGroup.name, ViCollapseTransitionGroup)
}

export default ViCollapse
