import { Stack } from '../util/stack'
import { defineReactive } from '../util/lang'
import config from '../config/index'

const historyStack = new Stack()

defineReactive(config, 'getHistoryStack', config.max, (newVal) => {
  const list = newVal()
  if (!list) {
    return
  }
  const length = list.length
  for (let i = length - 1; i > -1; i--) {
    const item = list[i]
    historyStack.unshift(item)
  }
})

export default historyStack
