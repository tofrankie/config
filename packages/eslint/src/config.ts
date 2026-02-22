import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsConfig } from './types'
import { antfu } from '@antfu/eslint-config'
import merge from 'lodash.merge'
import { JSDOC_PRESET_CONFIG } from './preset-configs/jsdoc'
import { TYPESCRIPT_PRESET_CONFIG } from './preset-configs/typescript'
import { buildPresetRules } from './preset-rules'

type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>
type UserFlatConfig = Parameters<typeof antfu>[1]
type Config = ReturnType<typeof antfu>

/**
 * @param antfuOptions Configures for antfu's config.
 * @param userFlatConfigs From the second arguments they are ESLint Flat Configs, you can have multiple configs.
 */
export function defineConfig(
  antfuOptions?: AntfuOptions,
  ...userFlatConfigs: UserFlatConfig[]
): Config {
  const userOptions = antfuOptions ?? {}
  const { rules: userRules, ...userOptionsWithoutRules } = userOptions

  const baseOptions: AntfuOptions = {
    formatters: {
      // Same configuration as @tofrankie/prettier
      prettierOptions: {
        printWidth: 100,
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'es5',
        htmlWhitespaceSensitivity: 'css',
      },
    },
    typescript: true,
  }

  // 1. 合并预设选项与用户选项（排除 rules）
  const mergedOptions = merge({}, baseOptions, userOptionsWithoutRules) as AntfuOptions

  // 2. 根据 mergedOptions 取预设规则
  const presetRules = buildPresetRules(mergedOptions)

  // 3. presetRules 与 userRules 合并，用户覆盖预设
  const mergedRules = merge({}, presetRules, userRules ?? {})

  // 4. mergedOptions 与 rules 合并
  const resolvedOptions = merge({}, mergedOptions, { rules: mergedRules })

  // 5. 根据 resolvedOptions 决定是否加载相关预设
  const presetConfigs = []
  if (mergedOptions.typescript) {
    presetConfigs.push(TYPESCRIPT_PRESET_CONFIG)
  }
  if (mergedOptions.jsdoc !== false) {
    presetConfigs.push(...JSDOC_PRESET_CONFIG)
  }

  return antfu(resolvedOptions, ...presetConfigs, ...userFlatConfigs)
}
