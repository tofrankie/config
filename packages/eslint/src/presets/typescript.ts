import type { TypedFlatConfigItem } from '../types'

export const typescriptRules = {
  'no-unused-vars': 'off',
  'unused-imports/no-unused-vars': 'off',
  'ts/no-unused-vars': [
    'error',
    {
      args: 'all',
      argsIgnorePattern: '^_',
      caughtErrors: 'all',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
} satisfies NonNullable<TypedFlatConfigItem['rules']>
