import type { Config } from 'stylelint'

export default {
  rules: {
    // https://stylelint.io/user-guide/rules/unit-no-unknown/#ignorefunctions
    // https://github.com/cuth/postcss-pxtorem/#a-message-about-ignoring-properties
    'unit-no-unknown': [true, { ignoreFunctions: ['1Px', '1PX'] }],
  },
} satisfies Config
