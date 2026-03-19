import { defineConfig } from '@tofrankie/eslint'

export default defineConfig({
  ignores: ['**/*.md'],
  vue: true,
  pnpm: true,
  rules: {
    'e18e/prefer-static-regex': 'off',
  },
})
