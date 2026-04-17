import { defineConfig } from '@tofrankie/eslint'

export default defineConfig({
  ignores: ['**/*.md', 'packages/eslint/tests/**', 'packages/tsconfig/base/**/*.json'],
  typescript: true,
})
