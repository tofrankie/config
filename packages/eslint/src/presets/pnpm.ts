import type { TypedFlatConfigItem } from '../types'

export const pnpmRules = {
  'pnpm/yaml-enforce-settings': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
