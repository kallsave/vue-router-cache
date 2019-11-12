import { transitionEvent } from './transition-event.js'

const COMPONENT_NAME = 'vi-collapse-transition-group'

export default {
  name: COMPONENT_NAME,
  functional: true,
  render(h, { children, data }) {
    let tag = data.attrs && data.attrs.tag ? data.attrs.tag : 'div'
    let duration = data.attrs && data.attrs.duration ? data.attrs.duration : 200
    let componentData = Object.assign({
      on: transitionEvent(duration),
      props: {
        tag: tag
      },
    }, data)
    return h('transition-group', componentData, children)
  },
}
