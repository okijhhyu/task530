module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
    'plugin:vue/vue3-essential',
  ],
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
    'parser': '@typescript-eslint/parser',
  },
  'plugins': [
    'vue',
    '@typescript-eslint',
  ],
  'rules': {
    'vue/multi-word-component-names': 'off',
    'require-jsdoc': 'off',
    'vue/html-indent': ['error', 2],
  },
};
