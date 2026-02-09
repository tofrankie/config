import type { Config } from 'stylelint'

export default {
  rules: {
    // https://stylelint.io/user-guide/rules/unit-no-unknown/#ignoreunits
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
  },
} satisfies Config
