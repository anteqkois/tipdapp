module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next',
    'airbnb',
    'airbnb-typescript',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*/tsconfig.json'],
      },
    },
  },
  rules: {
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-props-no-spreading': [
      2,
      {
        html: 'ignore',
        custom: 'ignore',
        explicitSpread: 'enforce',
        exceptions: [''],
      },
    ],
    'react/require-default-props': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'import/prefer-default-export': 'off',
    'import/group-exports': 'error',
    'no-console': ['error', { allow: ['log', 'warn', 'error'] }],
  },
  overrides: [
    {
      files: ['layout.tsx', 'loading.tsx', 'not-found.tsx', 'error.tsx', 'head.tsx', 'page.tsx'],
      rules: {
        'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
      },
    },
  ],
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', 'public', 'styles', '.next', 'coverage', 'dist', '.turbo', '*.cjs'],
};
