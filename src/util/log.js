export function warn(text) {
  console.warn(`%cwarn: ${text}`, 'color: orange')
}

export function error(text) {
  console.error(`%cerror: ${text}`, 'color: orange')
}
