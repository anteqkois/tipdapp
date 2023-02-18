module.exports = {
  extends: ['tipdapp-node'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
  },
};
