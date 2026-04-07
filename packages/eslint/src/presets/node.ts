import type { ConfigItemRules } from '../types'

/**
 * - rule: `node/*`
 * - original rule: `n/*`
 * - plugin: `eslint-plugin-n`
 * @see https://github.com/antfu/eslint-config#node
 * @see https://github.com/eslint-community/eslint-plugin-n
 */
export const NODE_RULES = {
  'node/prefer-global/process': 'off',
} satisfies ConfigItemRules
