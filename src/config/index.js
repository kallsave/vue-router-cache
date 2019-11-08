const noop = function () {}

const config = {
  max: Infinity,
  directionKey: 'direction',
  isSingleMode: true,
  isDebugger: false,
  getHistoryStack: noop,
  setHistoryStack: noop,
}

export default config
