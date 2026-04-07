import type antfu from '@antfu/eslint-config'
import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'

export type AntfuOptions = OptionsConfig & Omit<TypedFlatConfigItem, 'files'>
export type Composer = ReturnType<typeof antfu>
export type ConfigItemRules = NonNullable<TypedFlatConfigItem['rules']>
export type { TypedFlatConfigItem }
export type UserFlatConfig = Parameters<typeof antfu>[1]
