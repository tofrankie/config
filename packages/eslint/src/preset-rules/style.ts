import type { Linter } from 'eslint'

/**
 * - rule: `style/*`
 * - original rule: `@stylistic/*`
 * - plugin: `@stylistic/eslint-plugin`
 * @see https://github.com/antfu/eslint-config#stylistic
 * @see https://eslint.style/rules
 */
export const STYLE_PRESET_RULES: Linter.RulesRecord = {
  // ESLint Stylistic: https://eslint.style/rules/quotes#single
  'style/quotes': ['error', 'single', { avoidEscape: false }],
  'style/arrow-parens': ['error', 'as-needed'],
  'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
  'style/operator-linebreak': [
    'error',
    'before',
    {
      overrides: {
        '&&': 'after',
      },
    },
  ],
  'style/comma-dangle': 'off', // 交由 prettier 处理
}
