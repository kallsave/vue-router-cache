import createAPIComponent from 'vue-create-api'
// import createAPIComponent from '@/lib/vue-create-api/dist/vue-create-api.esm.js'

export default function createAPI(Vue, Component, events, single) {
  Vue.use(createAPIComponent)
  const api = Vue.createAPI(Component, events, single)
  return api
}
