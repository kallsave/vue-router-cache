import { MOBILE_MAX_SIZE } from '@/common/helpers/utils.js'

const DESIGN_WIDTH = 375
const REM2PX = 100

function resizeHandler() {
  const innerWidth = window.innerWidth > MOBILE_MAX_SIZE ? MOBILE_MAX_SIZE : window.innerWidth
  const remFontSize = innerWidth / DESIGN_WIDTH * REM2PX
  document.documentElement.style.fontSize = remFontSize + 'px'
}

resizeHandler()
window.addEventListener('resize', resizeHandler, false)
