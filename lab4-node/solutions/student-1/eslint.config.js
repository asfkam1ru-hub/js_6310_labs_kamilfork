module.exports = {
  root: true,
  env: { es2022: true, node: true, jest: true },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    indent: ['error', 2],
    'no-unused-vars': ['warn'],
    'import/no-unresolved': 'off'
  }
};
