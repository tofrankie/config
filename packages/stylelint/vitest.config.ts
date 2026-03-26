import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: '@tofrankie/stylelint',
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    passWithNoTests: false,
  },
})
