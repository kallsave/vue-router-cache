import { transitionEvent } from './transition-event.js'

const COMPONENT_NAME = 'vi-collapse-transition'

export default {
  name: COMPONENT_NAME,
  functional: true,
  render(h, { children, data }) {
    let duration = data.attrs && data.attrs.duration ? data.attrs.duration : 200
    let componentData = Object.assign({
      on: transitionEvent(duration),
    }, data)
    return h('transition', componentData, children)
  },
}
