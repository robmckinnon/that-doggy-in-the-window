module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'plugins': ['jest'],
  'extends': ['eslint:recommended', 'plugin:jest/recommended'],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
