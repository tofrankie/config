import type { Config } from 'prettier'

// https://prettier.io/docs/options
export default {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  htmlWhitespaceSensitivity: 'css',
} satisfies Config
