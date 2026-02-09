import type { Config } from 'stylelint'
import { IGNORE_FILES } from './constants'

// https://stylelint.io/user-guide/options/
export default {
  ignoreFiles: IGNORE_FILES,
  // https://github.com/stylelint/stylelint-config-standard
  // https://github.com/stormwarning/stylelint-config-recess-order
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
} satisfies Config
