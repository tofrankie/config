import type { Linter } from 'eslint'
import type { OptionsConfig } from '../types'
import { ANTFU_PRESET_RULES } from './antfu'
import { BASE_PRESET_RULES } from './base'
import { ESLINT_COMMENTS_PRESET_RULES } from './eslint-comments'
import { NODE_PRESET_RULES } from './node'
import { PNPM_PRESET_RULES } from './pnpm'
import { STYLE_PRESET_RULES } from './style'
import { TEST_PRESET_RULES } from './test'
import { VUE_PRESET_RULES } from './vue'

export const ALL_PRESET_RULES = {
  ...ANTFU_PRESET_RULES,
  ...BASE_PRESET_RULES,
  ...ESLINT_COMMENTS_PRESET_RULES,
  ...NODE_PRESET_RULES,
  ...PNPM_PRESET_RULES,
  ...STYLE_PRESET_RULES,
  ...TEST_PRESET_RULES,
}

// 如果关闭 antfu 对应选项，则不加载相关预设 rules，以避免 lint 时找不到规则而报错
const PRESET_PREDICATES: Array<{
  rules: Linter.RulesRecord
  predicate?: OptionPredicate
}> = [
  { rules: BASE_PRESET_RULES },
  { rules: ESLINT_COMMENTS_PRESET_RULES },
  { rules: STYLE_PRESET_RULES, predicate: notFalse('stylistic') },
  {
    rules: ANTFU_PRESET_RULES,
    predicate: options => (options as Record<string, unknown>).lessOpinionated !== true,
  },
  { rules: NODE_PRESET_RULES, predicate: notFalse('node') },
  { rules: TEST_PRESET_RULES, predicate: notFalse('test') },
  { rules: PNPM_PRESET_RULES, predicate: notFalse('pnpm') },
  {
    rules: VUE_PRESET_RULES,
    predicate: options => (options as Record<string, unknown>).vue === true,
  },
]

export function buildPresetRules(resolvedOptions: OptionsConfig): Linter.RulesRecord {
  return PRESET_PREDICATES.reduce<Linter.RulesRecord>((acc, { rules, predicate }) => {
    if (!predicate || predicate(resolvedOptions)) {
      Object.assign(acc, rules)
    }
    return acc
  }, {})
}

type OptionPredicate = (options: OptionsConfig) => boolean

/**
 * 自动检测/默认开启的配置，若不为 false 则加载相关预设 rules
 * 如果默认关闭的配置，若为 true 才加载相关预设 rules
 * @param key - The key of the option to check.
 * @return A predicate function that checks if the option is not false.
 */
function notFalse(key: keyof OptionsConfig): OptionPredicate {
  return options => (options as Record<string, unknown>)[key as string] !== false
}
