import Events from '../util/events'
import historyStack from './history-stack'
import { BACK, FORWARD } from './history-direction-name'

const historyStateEvent = new Events()
function historyChangeEvt(){
  if (historyStack.getByIndex(1) === window.location.href) {
    historyStateEvent.emit(BACK);
  } else {
    historyStateEvent.emit(FORWARD);
  }
}

window.addEventListener('hashchange', historyChangeEvt);
window.addEventListener('popstate', historyChangeEvt);

export default historyStateEvent
