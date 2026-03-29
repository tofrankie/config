import { defineConfig } from '@tofrankie/eslint'

export default defineConfig({
  ignores: ['**/*.md', 'packages/tsconfig/base/**/*.json'],
  vue: true,
  pnpm: true,
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
