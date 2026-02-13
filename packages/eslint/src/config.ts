import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { OptionsConfig } from './types'
import { antfu } from '@antfu/eslint-config'
import merge from 'lodash.merge'
import { TYPESCRIPT_PRESET_CONFIG } from './preset-configs/typescript'
import { buildPresetRules } from './preset-rules'

type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>
type UserFlatConfig = Parameters<typeof antfu>[1]
type Config = ReturnType<typeof antfu>

/**
 * @param antfuOptions Configures for antfu's config.
 * @param userFlatConfigs From the second arguments they are ESLint Flat Configs, you can have multiple configs.
 *
 * 前提：用户预设优于内置预设，若有相同的 key，则进行覆盖。
 * 1. 排除 rules 的前提下，合并 baseOptions 与 userOptions，得到 mergedOptions
 * 2. 根据 mergedOptions 取预设规则 presetRules，不对用户 rules 作错误兼容
 * 3. 将 presetRules 与 userRules 合并，得到 mergedRules
 * 4. 将 mergedOptions 与 { rules: mergedRules } 合并，得到 resolvedOptions
 * 5. 将 resolvedOptions 作为 antfu 第一个参数
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

  // 5. 根据 resolvedOptions.typescript 决定是否加载 typescript 预设配置
  const presetConfigs = mergedOptions.typescript ? [TYPESCRIPT_PRESET_CONFIG] : []

  return antfu(resolvedOptions, ...presetConfigs, ...userFlatConfigs)
}
