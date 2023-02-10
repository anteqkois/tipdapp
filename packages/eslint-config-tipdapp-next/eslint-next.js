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
    '@next/next/no-html-link-for-pages': 'off',
  },
  overrides: [
    {
      files: ['layout.tsx', 'not-found.tsx', 'error.tsx', 'head.tsx', 'page.tsx'],
      rules: {
        'react/function-component-definition': [2, { namedComponents: 'function-declaration' }],
      },
    },
  ],
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', 'public', 'styles', '.next', 'coverage', 'dist', '.turbo', '*.cjs'],
};
