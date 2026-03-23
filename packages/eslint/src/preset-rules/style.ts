import type { Linter } from 'eslint'

/**
 * - rule: `style/*`
 * - original rule: `@stylistic/*`
 * - plugin: `@stylistic/eslint-plugin`
 * @see https://github.com/antfu/eslint-config#stylistic
 * @see https://eslint.style/rules
 */
export const STYLE_PRESET_RULES: Linter.RulesRecord = {
  // https://eslint.style/rules/quotes#single
  'style/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'avoidEscape' }],
  // https://eslint.style/rules/quote-props#as-needed
  'style/quote-props': ['error', 'as-needed'],
  'style/arrow-parens': ['error', 'as-needed'],
  'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
  'style/operator-linebreak': [
    'error',
    'before',
    {
      // 与 Prettier 保持一致
      overrides: {
        '&&': 'after',
        '||': 'after',
        '??': 'after',
        '=': 'after',
        '+': 'after',
        '-': 'after',
        '*': 'after',
        '&': 'after',
        '<': 'after',
        '<=': 'after',
        '>': 'after',
        '>=': 'after',
      },
    },
  ],
  'style/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'none',
        requireLast: false,
      },
      singleline: {
        delimiter: 'semi', // 与 Prettier 保持一致
        requireLast: false,
      },
      multilineDetection: 'brackets',
      overrides: {
        interface: {
          multiline: {
            delimiter: 'none',
            requireLast: false,
          },
        },
      },
    },
  ],
  // 关闭以下样式相关的规则，交由 prettier 处理
  'style/comma-dangle': 'off',
  'style/indent': 'off',
  'style/indent-binary-ops': 'off',
  'style/multiline-ternary': 'off',
  'style/jsx-wrap-multilines': 'off',
  'style/jsx-curly-newline': 'off',
  'style/jsx-one-expression-per-line': 'off',
}
