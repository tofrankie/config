import type { AntfuOptions, ConfigItemRules, ResolvedConfigOptions } from '../types'
import { ANTFU_LESS_OPINIONATED_RULES } from './antfu'
import { E18E_RULES } from './e18e'
import { ESLINT_COMMENTS_RULES } from './eslint-comments'
import { JAVASCRIPT_RULES } from './javascript'
import { JSDOC_JAVASCRIPT_RULES, JSDOC_TYPESCRIPT_RULES } from './jsdoc'
import { NODE_RULES } from './node'
import { PNPM_RULES } from './pnpm'
import { REACT_RULES } from './react'
import { STYLISTIC_RULES } from './stylistic'
import { TEST_RULES } from './test'
import { TYPESCRIPT_RULES } from './typescript'
import { UNICORN_RULES } from './unicorn'
import { VUE_RULES } from './vue'

export {
  ANTFU_LESS_OPINIONATED_RULES,
  E18E_RULES,
  ESLINT_COMMENTS_RULES,
  JAVASCRIPT_RULES,
  JSDOC_JAVASCRIPT_RULES,
  JSDOC_TYPESCRIPT_RULES,
  NODE_RULES,
  PNPM_RULES,
  REACT_RULES,
  STYLISTIC_RULES,
  TEST_RULES,
  TYPESCRIPT_RULES,
  UNICORN_RULES,
  VUE_RULES,
}

export interface IntegrationRulePreset {
  key: keyof AntfuOptions
  option?: keyof ResolvedConfigOptions
  expected?: boolean
  rules: ConfigItemRules
}

export interface ConfigItemRulePreset {
  name: string
  option?: keyof ResolvedConfigOptions
  rules: ConfigItemRules
}

export const INTEGRATION_RULE_PRESETS = [
  { key: 'javascript', rules: JAVASCRIPT_RULES },
  { key: 'e18e', option: 'e18e', rules: E18E_RULES },
  { key: 'unicorn', option: 'unicorn', rules: UNICORN_RULES },
  { key: 'react', option: 'react', rules: REACT_RULES },
  { key: 'stylistic', option: 'stylistic', rules: STYLISTIC_RULES },
  {
    key: 'stylistic',
    option: 'lessOpinionated',
    expected: false,
    rules: ANTFU_LESS_OPINIONATED_RULES,
  },
  { key: 'test', option: 'test', rules: TEST_RULES },
  { key: 'typescript', option: 'typescript', rules: TYPESCRIPT_RULES },
  { key: 'vue', option: 'vue', rules: VUE_RULES },
] satisfies IntegrationRulePreset[]

export const CONFIG_ITEM_RULE_PRESETS = [
  { name: 'eslint-comments', rules: ESLINT_COMMENTS_RULES },
  { name: 'node', option: 'node', rules: NODE_RULES },
  { name: 'pnpm', option: 'pnpm', rules: PNPM_RULES },
] satisfies ConfigItemRulePreset[]
