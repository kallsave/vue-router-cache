const noop = function () { }

const config = {
  max: Infinity,
  directionKey: 'direction',
  isSingleMode: true,
  routerMode: 'hash',
  isDebugger: false,
  getHistoryStack: noop,
  setHistoryStack: noop,
}

export default config
