import type { TypedFlatConfigItem } from '../types'

export const unicornRules = {
  'unicorn/number-literal-case': ['error', { hexadecimalValue: 'lowercase' }],
} satisfies NonNullable<TypedFlatConfigItem['rules']>
