import createAPI from '../../common/helpers/create-api.js'
import { EVENT_CANCEL, EVENT_CONFIRM } from './vi-confirm.vue'

export default function create(Vue, Component) {
  createAPI(Vue, Component, [
    EVENT_CANCEL,
    EVENT_CONFIRM
  ], true)
}
