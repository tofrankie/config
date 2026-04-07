import type { TypedFlatConfigItem } from '../types'

export const reactRules = {
  'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
