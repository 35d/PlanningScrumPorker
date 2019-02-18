module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    src: path.resolve(__dirname, './src'),
  },
  rules: {},
}
