import type { Linter } from 'eslint'

/**
 * - rule: `eslint-comments/*`
 * - plugin: `eslint-plugin-eslint-comments`
 * @see https://github.com/antfu/eslint-config
 * @see https://github.com/eslint-community/eslint-plugin-eslint-comments
 */
export const ESLINT_COMMENTS_PRESET_RULES: Linter.RulesRecord = {
  'eslint-comments/no-unlimited-disable': 'off',
}
