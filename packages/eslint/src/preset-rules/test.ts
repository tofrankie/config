import type { Linter } from 'eslint'

/**
 * - rule: `test/*`
 * - original rule: `vitest/*`, `no-only-tests/*`
 * - plugin: `@vitest/eslint-plugin`, `eslint-plugin-no-only-tests`
 * @see https://github.com/antfu/eslint-config#test
 * @see https://github.com/vitest-dev/eslint-plugin-vitest
 * @see https://github.com/levibuzolic/eslint-plugin-no-only-tests
 */
export const TEST_PRESET_RULES: Linter.RulesRecord = {
  'test/prefer-lowercase-title': 'off',
}
