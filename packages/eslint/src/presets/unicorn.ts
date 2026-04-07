import type { ConfigItemRules } from '../types'

/**
 * - rule: `unicorn/*`
 * - plugin: `eslint-plugin-unicorn`
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 */
export const UNICORN_RULES = {
  'unicorn/number-literal-case': ['error', { hexadecimalValue: 'lowercase' }],
} satisfies ConfigItemRules
