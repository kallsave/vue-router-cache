// https://github.com/marcuswestin/store.js#make-your-own-build
const engine = require('store/src/store-engine')
const storages = [
  require('store/storages/localStorage')
]

const storePlugins = [
  require('store/plugins/defaults'),
  require('store/plugins/expire')
]

const tpLocalStorage = engine.createStore(storages, storePlugins)

export default tpLocalStorage
