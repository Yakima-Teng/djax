// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  plugins: [],
  globals: {
    '$': true,
    '$utils': true,
    'path': true,
    'fs': true,
    'location': true,
    'history': true,
    'localStorage': true,
    'sessionStorage': true
  },
  // add your custom rules here
  rules: {
    'no-extra-semi': 2,
    'no-var': 2,
    // 'semi': ['error', 'always'],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
