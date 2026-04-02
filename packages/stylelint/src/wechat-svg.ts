import type { Config } from 'stylelint'
import { WECHAT_SVG_PROPERTY_ORDER } from './constants/wechat-svg-property-order'

export default {
  customSyntax: 'postcss-html',
  plugins: ['stylelint-order'],
  rules: {
    // https://stylelint.io/user-guide/rules/number-max-precision/
    'number-max-precision': 16,
    // https://stylelint.io/user-guide/rules/property-no-vendor-prefix/
    'property-no-vendor-prefix': [true, { ignoreProperties: ['-webkit-overflow-scrolling', '-webkit-user-select'] }],
    // https://github.com/hudochenkov/stylelint-order/blob/master/rules/properties-order/README.md
    'order/properties-order': WECHAT_SVG_PROPERTY_ORDER,
    // https://stylelint.io/user-guide/rules/value-keyword-case/#ignorekeywords
    'value-keyword-case': ['lower', { ignoreKeywords: ['visiblePainted', 'visibleFill', 'visibleStroke'] }],
  },
} satisfies Config
