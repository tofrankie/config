import type { ConfigItemRules } from '../types'

/**
 * - rule: `test/*`
 * - original rule: `vitest/*`, `no-only-tests/*`
 * - plugin: `@vitest/eslint-plugin`, `eslint-plugin-no-only-tests`
 * @see https://github.com/antfu/eslint-config#test
 * @see https://github.com/vitest-dev/eslint-plugin-vitest
 * @see https://github.com/levibuzolic/eslint-plugin-no-only-tests
 */
export const TEST_RULES = {
  'test/prefer-lowercase-title': 'off',
} satisfies ConfigItemRules
