module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'plugin:react/recommended',
    'react-app',
    'google',
    'plugin:testing-library/react',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react',
    '@typescript-eslint',
    'testing-library',
    'only-warn'
  ],
  'ignorePatterns': [
    '**/*.generated.ts',
    '**/react-app-env.d.ts',
  ],
  'rules': {
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', { 'code': 180 }],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2, { 'MemberExpression': 1, 'SwitchCase': 1 }],
    'camelcase': ['off'],
    'valid-jsdoc': ['off'],
    'require-jsdoc': ['off'],
    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'comma-dangle': ['error', {
      'functions': 'only-multiline',
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
      'imports': 'only-multiline',
      'exports': 'only-multiline',
    }],
    'operator-linebreak': ['error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],
    '@typescript-eslint/no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'varsIgnorePattern': '[_]' }],
    'no-unused-vars': ['error', { 'ignoreRestSiblings': true, 'varsIgnorePattern': '[_]' }]
  }
};
