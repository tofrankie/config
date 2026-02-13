import type { Linter } from 'eslint'

/**
 * - rule: `*`
 * - plugin: `none`
 * @see https://eslint.org/docs/latest/rules/
 */
export const BASE_PRESET_RULES: Linter.RulesRecord = {
  // https://eslint.org/docs/latest/rules/
  'no-console': 'off',
  'no-debugger': 'warn',
  'no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'all',
      argsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true,
    },
  ],
}
