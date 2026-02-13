import type { Linter } from 'eslint'

/**
 * - rule: `antfu/*`
 * - plugin: `eslint-plugin-antfu`
 * @see https://github.com/antfu/eslint-config#top-level-function-style-etc
 * @see https://github.com/antfu/eslint-plugin-antfu
 */
export const ANTFU_PRESET_RULES: Linter.RulesRecord = {
  'antfu/if-newline': 'off',
  'antfu/consistent-list-newline': 'off',
}
