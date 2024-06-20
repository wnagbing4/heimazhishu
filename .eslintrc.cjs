/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "no-undef": "off",
    'space-before-function-paren': 'off',   // 解决与prettier冲突
    eqeqeq: ['off'],   // 要求使用 === 或 ！==
    'vue/multi-word-component-names': ['off'],  // 解决vue首行报错


  }
}
