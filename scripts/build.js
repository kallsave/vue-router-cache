const path = require('path')
const fs = require('fs')
const rollup = require('rollup')
const terser = require('terser')
const zlib = require('zlib')
const buildMap = require('./config')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report(extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError(e) {
  console.log(e)
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

async function buildEntry() {
  for (const key in buildMap) {
    const config = buildMap[key]
    const output = config.output
    const { file, banner } = output
    const isMin = /(min)\.js$/.test(file)
    await (() => {
      return new Promise((resolve) => {
        rollup.rollup({
          input: config.input,
          plugins: config.plugins
        })
        .then((bundle) => bundle.generate(output))
        .then(({ output: [{ code }] }) => {
          if(isMin) {
            const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
              toplevel: true,
              output: {
                ascii_only: true
              },
              compress: {
                pure_funcs: ['makeMap']
              }
            }).code
            resolve()
            return write(file, minified, true)
          } else {
            resolve()
            return write(file, code)
          }
        })
      }).catch((err) => {
        console.error(err)
      })
    })()
  }
}

buildEntry()
