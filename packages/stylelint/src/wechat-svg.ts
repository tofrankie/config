import type { Config } from 'stylelint'

export default {
  rules: {
    // https://stylelint.io/user-guide/rules/property-no-vendor-prefix
    'property-no-vendor-prefix': [
      true,
      { ignoreProperties: ['-webkit-overflow-scrolling', '-webkit-user-select'] },
    ],
  },
} satisfies Config
