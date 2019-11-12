const path = require('path')
const fs = require('fs')
const svgtofont = require('svgtofont')
const glob = require('glob-all')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}

function mkdirSync(dirname) {
  if (existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const SVG_FOLDER = 'svg'
const FONTS_FOLDER = 'fonts'

const COMMON_FOLDER = 'common'
const COMMON_PREFIX = 'common-icon'

let distRuler = new RegExp(`(.*\/)?${SVG_FOLDER}`, 'g')
let fontNameRuler = new RegExp(`(.*\/)?(.*)?\/${SVG_FOLDER}`, 'g')

let fontFiles = glob.sync([
  resolve(`src/${COMMON_FOLDER}/**/${SVG_FOLDER}`),
])

async function create() {
  for (let i = 0; i < fontFiles.length; i++) {
    await (() => {
      return new Promise((resolve, reject) => {
        let item = fontFiles[i]
        let dist = item.replace(distRuler, `$1${FONTS_FOLDER}`)
        let fontName = ''
        if (item.indexOf(COMMON_FOLDER) !== -1) {
          fontName = COMMON_PREFIX
        }
        let reg = new RegExp(`${SVG_FOLDER}`)
        let fontsFolderPath = item.replace(reg, `${FONTS_FOLDER}`)
        mkdirSync(fontsFolderPath)
        svgtofont({
          src: path.resolve(item),
          dist: path.resolve(dist),
          fontName,
          css: true,
          startNumber: 20000,
          emptyDist: false,
        }).then(() => {
          console.log('done')
          resolve()
        }).catch((err) => {
          console.log('err', err)
        })
      })
    })()
  }
}

create()
