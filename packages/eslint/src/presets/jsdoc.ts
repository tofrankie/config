import type { TypedFlatConfigItem } from '../types'

export const jsdocJavaScriptRules = {
  'jsdoc/check-syntax': 'error',
  'jsdoc/newline-after-description': 'off',
  'jsdoc/no-defaults': 'off',
  'jsdoc/reject-any-type': 'off',
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-param-type': 'warn',
  'jsdoc/require-property-description': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/require-returns-type': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>

export const jsdocTypeScriptRules = {
  'jsdoc/check-syntax': 'error',
  'jsdoc/newline-after-description': 'off',
  'jsdoc/no-defaults': 'off',
  'jsdoc/reject-any-type': 'off',
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-param-type': 'off',
  'jsdoc/require-property-description': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/require-returns-type': 'off',
} satisfies NonNullable<TypedFlatConfigItem['rules']>
