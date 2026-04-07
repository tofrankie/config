import { defineConfig } from '@tofrankie/eslint'

export default defineConfig({
  ignores: ['**/*.md', 'packages/eslint/tests/**', 'packages/tsconfig/base/**/*.json'],
  vue: true,
  pnpm: true,
  jsdoc: false,
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
