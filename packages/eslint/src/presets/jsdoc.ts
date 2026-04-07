import type { ConfigItemRules } from '../types'

/**
 * - rule: `jsodc/*`
 * - plugin: `eslint-plugin-jsdoc`
 * @see https://github.com/gajus/eslint-plugin-jsdoc
 */
const COMMON_RULES = {
  'jsdoc/check-syntax': 'error',
  'jsdoc/no-defaults': 'off',
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-property-description': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/newline-after-description': 'off',
  'jsdoc/reject-any-type': 'off',
} satisfies ConfigItemRules

export const JSDOC_JAVASCRIPT_RULES = {
  ...COMMON_RULES,
  'jsdoc/require-param-type': 'warn',
} satisfies ConfigItemRules

export const JSDOC_TYPESCRIPT_RULES = {
  ...COMMON_RULES,
  'jsdoc/require-param-type': 'off',
} satisfies ConfigItemRules
