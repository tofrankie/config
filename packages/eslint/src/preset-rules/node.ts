import type { Linter } from 'eslint'

/**
 * - rule: `node/*`
 * - original rule: `n/*`
 * - plugin: `eslint-plugin-n`
 * @see https://github.com/antfu/eslint-config#node
 * @see https://github.com/eslint-community/eslint-plugin-n
 */
export const NODE_PRESET_RULES: Linter.RulesRecord = {
  'node/prefer-global/process': 'off',
}
