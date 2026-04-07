import type { AntfuOptions } from '../types'

export const DEFAULT_OPTIONS = {
  formatters: {
    astro: false,
    css: false,
    graphql: false,
    html: false,
    markdown: false,
    slidev: false,
    svg: false,
    xml: false,
    // Same configuration as @tofrankie/prettier.
    prettierOptions: {
      printWidth: 120,
      semi: false,
      singleQuote: true,
      arrowParens: 'avoid',
      trailingComma: 'es5',
      htmlWhitespaceSensitivity: 'css',
    },
  },
} satisfies AntfuOptions
