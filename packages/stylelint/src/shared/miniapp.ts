import type { Config } from 'stylelint'

// 原生小程序、uni-app 共享配置

export const MINIAPP_SHARED_CONFIG = {
  // TODO: 暂未支持
  // https://github.com/stylelint/stylelint/issues/9070
  // https://github.com/stylelint/stylelint/issues/9037#issuecomment-3891721635
  // languageOptions: {
  //   syntax: {
  //     units: { length: ['rpx'] },
  //   },
  // },
  rules: {
    // https://stylelint.io/user-guide/rules/unit-no-unknown/#ignoreunits
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
    'selector-type-no-unknown': [true, { ignoreTypes: ['page'] }],
    // https://stylelint.io/user-guide/rules/declaration-property-value-no-unknown/
    // https://github.com/stylelint/stylelint/issues/9037#issuecomment-3891721635
    'declaration-property-value-no-unknown': [
      true,
      {
        ignoreProperties: {
          '/.+/': ['/[0-9]+(\\.[0-9]+)?rpx/'], // 避免 font-size: 10rpx、10.5rpx 此类写法被误报
        },
      },
    ],
  },
} satisfies Config
