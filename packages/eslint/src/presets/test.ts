import type { TypedFlatConfigItem } from '../types'

export const testRules = {
  'test/prefer-lowercase-title': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
