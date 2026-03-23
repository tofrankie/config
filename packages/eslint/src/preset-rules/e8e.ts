import type { Linter } from 'eslint'

/**
 * - rule: `e8e/*`
 * - plugin: `@e18e/eslint-plugin`
 * @see https://github.com/e18e/eslint-plugin
 */
export const E8E_PRESET_RULES: Linter.RulesRecord = {
  // https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/ban-dependencies.md
  'e18e/ban-dependencies': 'off',
  'e18e/prefer-array-to-sorted': 'off',
  'e18e/prefer-static-regex': 'off',
}
