import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsConfig } from './types'
import { antfu } from '@antfu/eslint-config'
import merge from 'lodash.merge'

type Options = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>
type UserConfigs = Parameters<typeof antfu>[1]
type Config = ReturnType<typeof antfu>

export function defineConfig(options: Options, userConfigs: UserConfigs): Config {
  const baseConfig = {
    formatters: true,

    // https://github.com/antfu/eslint-config#plugins-renaming
    rules: {
      // base: https://eslint.org/docs/latest/rules/
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
          // TODO: 为什么 const { foo: _bar } = baz 的 _bar 会被识别为未使用变量
        },
      ],

      // eslint-plugin-antfu: https://github.com/antfu/eslint-plugin-antfu
      'antfu/if-newline': 'off',
      'antfu/consistent-list-newline': 'off',

      // eslint-plugin-n: https://github.com/eslint-community/eslint-plugin-n
      'node/prefer-global/process': 'off',

      // vitest: https://github.com/vitest-dev/eslint-plugin-vitest
      // no-only-tests: https://github.com/levibuzolic/eslint-plugin-no-only-tests
      'test/prefer-lowercase-title': 'off',

      // pnpm: https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm
      'pnpm/yaml-enforce-settings': 'off',

      // ESLint Stylistic: https://eslint.style/rules/quotes#single
      'style/quotes': ['error', 'single', { avoidEscape: true }],
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

      // eslint-plugin-eslint-comments: https://mysticatea.github.io/eslint-plugin-eslint-comments/
      'eslint-comments/no-unlimited-disable': 'off',
    },
  }

  const mergedConfig = merge(baseConfig, options)

  return antfu(mergedConfig, userConfigs)
}
