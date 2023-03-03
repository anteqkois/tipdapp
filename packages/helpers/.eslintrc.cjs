module.exports = {
  extends: ['tipdapp-node'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    'import/no-unresolved': [
      2,
      { ignore: ['@config', '@middlewares', '@types', '@services'] },
    ],
    '@typescript-eslint/no-namespace': 'off',
  },
};
