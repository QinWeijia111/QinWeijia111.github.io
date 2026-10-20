import js from '@eslint/js';
import ts from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
export default [
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      '.review/**',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: {
        module: 'readonly',
        process: 'readonly',
        fetch: 'readonly',
        console: 'readonly',
        URL: 'readonly',
        Buffer: 'readonly',
        document: 'readonly',
        window: 'readonly',
        localStorage: 'readonly',
        getComputedStyle: 'readonly',
      },
    },
  },
];
