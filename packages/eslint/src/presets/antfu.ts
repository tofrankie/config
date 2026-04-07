import type { ConfigItemRules } from '../types'

/**
 * - rule: `antfu/*`
 * - plugin: `eslint-plugin-antfu`
 * @see https://github.com/antfu/eslint-config#top-level-function-style-etc
 * @see https://github.com/antfu/eslint-plugin-antfu
 */
export const ANTFU_LESS_OPINIONATED_RULES = {
  'antfu/consistent-list-newline': 'off',
  'antfu/if-newline': 'off',
} satisfies ConfigItemRules
