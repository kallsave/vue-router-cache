// const babelPresetFlowVue = {
//   plugins: [
//     require('@babel/plugin-proposal-class-properties'),
//     // require('@babel/plugin-syntax-flow'), // not needed, included in transform-flow-strip-types
//     require('@babel/plugin-transform-flow-strip-types')
//   ]
// }

module.exports = {
  presets: [
    require('@babel/preset-env'),
    // require('babel-preset-flow-vue')
    // babelPresetFlowVue
  ],
  ignore: [
    'dist /*.js',
    'packages/**/*.js'
  ]
}
