import type { TypedFlatConfigItem } from '../types'

export const e18eRules = {
  'e18e/ban-dependencies': 'off',
  'e18e/prefer-array-to-sorted': 'off',
  'e18e/prefer-static-regex': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
