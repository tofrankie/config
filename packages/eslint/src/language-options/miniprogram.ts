import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export const MINIPROGRAM_LANGUAGE_OPTIONS: NonNullable<TypedFlatConfigItem['languageOptions']> = {
  globals: {
    wx: true,
    App: true,
    getApp: true,
    getCurrentPages: true,
    Page: true,
    Component: true,
    Behavior: true,
    requireMiniProgram: true,
    requirePlugin: true,
  },
}
