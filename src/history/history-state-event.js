import Events from '../util/events'
import historyStack from './history-stack'
import { BACK, FORWARD } from './history-direction-name'

const historyStateEvent = new Events()

window.addEventListener('hashchange', () => {
  if (historyStack.getByIndex(1) === window.location.href) {
    historyStateEvent.emit(BACK)
  }
})

export default historyStateEvent
