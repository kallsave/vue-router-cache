const path = require('path')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint').eslint

const util = require('./util')
const version = require('../package.json').version
const name = require('../package.json').name
const apiName = util.createApiName(name)

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} kallsave\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const plugins = [
  eslint({
    include: [
      resolve('src/**/*.js')
    ]
  }),
  node(),
  cjs(),
]

const buildMap = {
  esm: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.esm.js`),
      format: 'es',
      banner: banner
    },
    plugins: plugins.concat([
      babel()
    ])
  },
  umd: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.umd.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins: plugins.concat([
      babel()
    ])
  },
  main: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins: plugins.concat([
      babel()
    ])
  },
  min: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.min.js`),
      format: 'umd',
      name: apiName,
      banner: banner
    },
    plugins: plugins.concat([
      babel()
    ])
  }
}

module.exports = buildMap
