import type { TypedFlatConfigItem } from '../types'

export const javascriptRules = {
  'no-console': 'off',
  'no-debugger': 'warn',
  'no-unused-vars': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
