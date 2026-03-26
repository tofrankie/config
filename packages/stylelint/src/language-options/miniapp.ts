import type { LanguageOptions } from 'stylelint'

export const MINIAPP_LANGUAGE_OPTIONS: LanguageOptions = {
  syntax: {
    // https://github.com/stylelint/stylelint/issues/9037#issuecomment-3891721635
    units: { length: ['rpx'] },
  },
}
