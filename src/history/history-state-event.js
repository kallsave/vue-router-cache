import config from '../config/index'
import Events from '../util/events'
import historyStack from './history-stack'
import { BACK, FORWARD } from './history-direction-name'

const historyStateEvent = new Events()

function historyChange() {
  if (historyStack.getByIndex(1) === window.location.href) {
    historyStateEvent.emit(BACK)
  } else {
    historyStateEvent.emit(FORWARD)
  }
}

switch (config.routerMode) {
  case 'hash': {
    window.addEventListener('hashchange', historyChange)

    break
  }

  case 'history': {
    window.addEventListener('popstate', historyChange)

    break
  }
}

export default historyStateEvent
