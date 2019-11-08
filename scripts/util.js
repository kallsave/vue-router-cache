exports.getIPAddress = () => {
  let interfaces = require('os').networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

exports.camelize = (str) => {
  str = String(str)
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  })
}

exports.createApiName = (str) => {
  str = str.replace(str[0], str[0].toUpperCase())
  return exports.camelize(str)
}
