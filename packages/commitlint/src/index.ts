import type { UserConfig } from '@commitlint/types'

// https://commitlint.js.org/reference/configuration.html
export default {
  extends: ['@commitlint/config-conventional'],
  // https://commitlint.js.org/reference/rules.html
  rules: {
    'subject-case': [0],
  },
} satisfies UserConfig
