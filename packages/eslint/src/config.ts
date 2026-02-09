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

      // eslint-plugin-n: https://github.com/eslint-community/eslint-plugin-n
      'node/prefer-global/process': 'off',

      // vitest: https://github.com/vitest-dev/eslint-plugin-vitest
      // no-only-tests: https://github.com/levibuzolic/eslint-plugin-no-only-tests
      'test/prefer-lowercase-title': 'off',

      // pnpm: https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm
      'pnpm/yaml-enforce-settings': 'off',
    },
  }

  const mergedConfig = merge(baseConfig, options)

  return antfu(mergedConfig, userConfigs)
}
