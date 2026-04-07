import type { ConfigItemRules } from '../types'

/**
 * - rule: `*`
 * - plugin: `none`
 * @see https://eslint.org/docs/latest/rules/
 */
export const JAVASCRIPT_RULES = {
  'no-console': 'off',
  'no-debugger': 'warn',
  'unused-imports/no-unused-vars': 'off',
  'no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'all',
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
} satisfies ConfigItemRules
