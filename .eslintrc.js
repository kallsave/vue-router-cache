// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    'ecmaVersion': 2017
  },
  env: {
    'node': true,
    'commonjs': true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'generator-star-spacsing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'lines-between-class-members': 'off',
    'prefer-const': 'error',
  }
}
