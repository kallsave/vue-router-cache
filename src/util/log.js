/* eslint-disable */

export function warn(text) {
  console.warn(`%cwarn: ${text}`, 'color: orange')
}

export function error(text) {
  console.error(`%cerror: ${text}`, 'color: orange')
}

export function log(text) {
  console.log(`%c${text}`, 'color: orange')
}
