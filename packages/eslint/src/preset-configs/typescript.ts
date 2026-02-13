import type { Linter } from 'eslint'

export const TYPESCRIPT_PRESET_CONFIG: Linter.Config = {
  files: ['**/*.ts', '**/*.tsx'],
  rules: {
    // Note: you must disable the base rule as it can report incorrect errors
    'no-unused-vars': 'off',
    // https://typescript-eslint.io/rules/no-unused-vars/
    'ts/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
  },
}
