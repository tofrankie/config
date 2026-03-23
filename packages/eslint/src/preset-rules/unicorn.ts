import type { Linter } from 'eslint'

/**
 * - rule: `unicorn/*`
 * - plugin: `eslint-plugin-unicorn`
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 */
export const UNICORN_PRESET_RULES: Linter.RulesRecord = {
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
  'unicorn/number-literal-case': ['error', { hexadecimalValue: 'lowercase' }], // 与 Prettier  0xFF -> 0xff
}
