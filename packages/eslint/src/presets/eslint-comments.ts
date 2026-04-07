import type { ConfigItemRules } from '../types'

/**
 * - rule: `eslint-comments/*`
 * - plugin: `eslint-plugin-eslint-comments`
 * @see https://github.com/antfu/eslint-config
 * @see https://github.com/eslint-community/eslint-plugin-eslint-comments
 */
export const ESLINT_COMMENTS_RULES = {
  'eslint-comments/no-unlimited-disable': 'off',
} satisfies ConfigItemRules
