import type { Linter } from 'eslint'
import { jsdoc } from 'eslint-plugin-jsdoc'

const SHARED_RULES = {
  'jsdoc/check-syntax': 'error',
  'jsdoc/no-defaults': 'off',
  'jsdoc/require-jsdoc': 'off',
  'jsdoc/require-param-description': 'off',
  'jsdoc/require-property-description': 'off',
  'jsdoc/require-returns': 'off',
  'jsdoc/require-returns-type': 'off',
  'jsdoc/require-returns-description': 'off',
  'jsdoc/newline-after-description': 'off',
} as const

const SHARED_SETTINGS = {
  tagNamePreference: {
    description: 'desc',
    property: 'prop',
    returns: 'return',
  },
} as const

// https://github.com/gajus/eslint-plugin-jsdoc
const JSDOC_JS_CONFIG = jsdoc({
  config: 'flat/recommended-typescript-flavor-error',
  files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
  rules: {
    ...SHARED_RULES,
    'jsdoc/require-param-type': 'warn',
  },
  settings: SHARED_SETTINGS,
})

const JSDOC_TS_CONFIG = jsdoc({
  config: 'flat/recommended-typescript-error',
  files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
  rules: {
    ...SHARED_RULES,
    'jsdoc/require-param-type': 'off',
  },
  settings: SHARED_SETTINGS,
})

export const JSDOC_PRESET_CONFIG: Linter.Config[] = [JSDOC_JS_CONFIG, JSDOC_TS_CONFIG]
