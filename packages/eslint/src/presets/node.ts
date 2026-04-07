import type { TypedFlatConfigItem } from '../types'

export const nodeRules = {
  'node/prefer-global/process': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
