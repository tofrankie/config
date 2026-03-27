import type { Config } from 'stylelint'

// native miniprogram & uni-app shared config

export const MINIPROGRAM_SHARED_RULES = {
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
} satisfies Config['rules']
