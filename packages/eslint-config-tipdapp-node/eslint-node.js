module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'plugin:security/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts'],
        moduleDirectory: ['node_modules', 'src/'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: '.',
      },
    },
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/group-exports': 'error',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true, allowShortCircuit: true }],
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': ['error', { allow: ['_count'] }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-throw-literal': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true,
      },
    ],
  },
  overrides: [
    {
      files: ['src/**/*Api.ts', 'src/**/*Validation.ts'],
      rules: { 'import/group-exports': 'off', '@typescript-eslint/no-explicit-any': 'off' },
    },
    {
      files: ['src/**/*Controller.ts'],
      rules: { 'consistent-return': 'off' },
    },
  ],
  ignorePatterns: ['lib', '**/*.js', '**/*.cjs', 'node_modules', '.turbo', 'dist', 'coverage', 'artefacts'],
};
