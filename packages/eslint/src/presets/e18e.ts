import type { ConfigItemRules } from '../types'

/**
 * - rule: `e18e/*`
 * - plugin: `@e18e/eslint-plugin`
 * @see https://github.com/e18e/eslint-plugin
 */
export const E18E_RULES = {
  // https://github.com/es-tooling/eslint-plugin-depend/blob/main/docs/rules/ban-dependencies.md
  'e18e/ban-dependencies': 'off',
  'e18e/prefer-static-regex': 'off',
} satisfies ConfigItemRules
