import type { AntfuOptions, ResolvedConfigOptions, TypedFlatConfigItem } from '../types'
import { e18eRules } from './e18e'
import { eslintCommentsRules } from './eslint-comments'
import { javascriptRules } from './javascript'
import { jsdocJavaScriptRules, jsdocTypeScriptRules } from './jsdoc'
import { nodeRules } from './node'
import { pnpmRules } from './pnpm'
import { reactRules } from './react'
import { stylisticLessOpinionatedRules, stylisticRules } from './stylistic'
import { testRules } from './test'
import { typescriptRules } from './typescript'
import { unicornRules } from './unicorn'
import { vueRules } from './vue'

export {
  e18eRules,
  eslintCommentsRules,
  javascriptRules,
  jsdocJavaScriptRules,
  jsdocTypeScriptRules,
  nodeRules,
  pnpmRules,
  reactRules,
  stylisticLessOpinionatedRules,
  stylisticRules,
  testRules,
  typescriptRules,
  unicornRules,
  vueRules,
}

export interface IntegrationRulePreset {
  key: keyof AntfuOptions
  option?: keyof ResolvedConfigOptions
  rules: NonNullable<TypedFlatConfigItem['rules']>
}

export interface ConfigItemRulePreset {
  name: string
  option?: keyof ResolvedConfigOptions
  rules: NonNullable<TypedFlatConfigItem['rules']>
}

export const integrationRulePresets = [
  { key: 'javascript', rules: javascriptRules },
  { key: 'e18e', option: 'e18e', rules: e18eRules },
  { key: 'unicorn', option: 'unicorn', rules: unicornRules },
  { key: 'react', option: 'react', rules: reactRules },
  { key: 'stylistic', option: 'stylistic', rules: stylisticRules },
  { key: 'stylistic', rules: stylisticLessOpinionatedRules },
  { key: 'test', option: 'test', rules: testRules },
  { key: 'typescript', option: 'typescript', rules: typescriptRules },
  { key: 'vue', option: 'vue', rules: vueRules },
] satisfies IntegrationRulePreset[]

export const configItemRulePresets = [
  { name: 'eslint-comments', rules: eslintCommentsRules },
  { name: 'node', option: 'node', rules: nodeRules },
  { name: 'pnpm', option: 'pnpm', rules: pnpmRules },
] satisfies ConfigItemRulePreset[]
