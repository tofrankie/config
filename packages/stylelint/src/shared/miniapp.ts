import type { Config } from 'stylelint'

// 原生小程序、uni-app 共享配置

export const MINIAPP_SHARED_CONFIG = {
  languageOptions: {
    syntax: {
      // https://github.com/stylelint/stylelint/issues/9037#issuecomment-3891721635
      units: { length: ['rpx'] },
    },
  },
  rules: {
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: [
          'page',
          'radio',
          'radio-group',
          'checkbox',
          'checkbox-group',
          'switch',
          'picker',
          'picker-view',
          'picker-view-column',
          'swiper',
          'slider',
          'wx-slider',
          'navigator',
          'scroll-view',
          'cover-view',
          'cover-image',
        ],
      },
    ],
  },
} satisfies Config
