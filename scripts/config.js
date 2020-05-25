const path = require('path')
const node = require('@rollup/plugin-node-resolve')
const cjs = require('@rollup/plugin-commonjs')
const replace = require('@rollup/plugin-replace')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint').eslint

const util = require('./util')
const package = require('../package.json')
const author = package.author
const name = package.name
const apiName = util.createApiName(name)
const version = package.version

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const plugins = [
  replace({
    include: 'src/index.js',
    VERSION: version,
  }),
  eslint({
    include: [
      resolve('src/**/*.js')
    ]
  }),
  node(),
  cjs(),
  babel(),
]

const input = resolve('src/index.js')

const buildMap = {
  esm: {
    input,
    output: {
      file: resolve(`dist/${name}.esm.js`),
      format: 'esm',
      banner: banner
    },
    plugins,
  },
  umd: {
    input,
    output: {
      file: resolve(`dist/${name}.umd.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins,
  },
  main: {
    input,
    output: {
      file: resolve(`dist/${name}.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins,
  },
  min: {
    input,
    output: {
      file: resolve(`dist/${name}.min.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins,
  }
}

module.exports = buildMap
