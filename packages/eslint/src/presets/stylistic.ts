import type { ConfigItemRules } from '../types'

/**
 * - rule: `style/*`
 * - original rule: `@stylistic/*`
 * - plugin: `@stylistic/eslint-plugin`
 * @see https://github.com/antfu/eslint-config#stylistic
 * @see https://eslint.style/rules
 */
export const STYLISTIC_RULES = {
  'style/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: 'avoidEscape' }],
  'style/quote-props': ['error', 'as-needed'],
  'style/arrow-parens': ['error', 'as-needed'],
  'style/brace-style': ['error', '1tbs', { allowSingleLine: false }],
  'style/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
  'style/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'none',
        requireLast: false,
      },
      singleline: {
        delimiter: 'semi', // Keep consistent with Prettier
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

  // Delegated to Prettier
  'style/comma-dangle': 'off',
  'style/indent': 'off',
  'style/indent-binary-ops': 'off',
  'style/jsx-curly-newline': 'off',
  'style/jsx-one-expression-per-line': 'off',
  'style/jsx-wrap-multilines': 'off',
  'style/multiline-ternary': 'off',
  'style/object-curly-spacing': 'off',
} satisfies ConfigItemRules
