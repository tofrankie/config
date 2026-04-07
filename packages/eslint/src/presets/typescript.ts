import type { ConfigItemRules } from '../types'

/**
 * - rule: `ts/*`
 * - original rule: `@typescript-eslint/*`
 * - plugin: `@typescript-eslint/eslint-plugin`
 * @see https://github.com/antfu/eslint-config#typescript
 * @see https://typescript-eslint.io/rules/
 */
export const TYPESCRIPT_RULES = {
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
} satisfies ConfigItemRules
