import type { TypedFlatConfigItem } from '../types'

export const stylisticRules = {
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
        delimiter: 'semi',
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
  'style/comma-dangle': 'off',
  'style/indent': 'off',
  'style/indent-binary-ops': 'off',
  'style/jsx-curly-newline': 'off',
  'style/jsx-one-expression-per-line': 'off',
  'style/jsx-wrap-multilines': 'off',
  'style/multiline-ternary': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>

export const stylisticLessOpinionatedRules = {
  'antfu/consistent-list-newline': 'off',
  'antfu/if-newline': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
