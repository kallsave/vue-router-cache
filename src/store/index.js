import config from '../config/index'
import { MapStack } from '../util/stack'
import { defineReactive } from '../util/lang'

export const globalStack = new MapStack(config.max)

export const globalCache = []

export const globalMultiKeyMap = Object.create(null)

defineReactive(config, 'max', config.max, (newVal) => {
  globalStack.updateSize(newVal)
})
