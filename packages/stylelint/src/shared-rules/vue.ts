import type { Config } from 'stylelint'

export const VUE_SHARED_RULES = {
  // stylelint-config-recommended-vue 中配置了 `"function-no-unknown": [true, { ignoreFunctions: ["v-bind"] }]`，这里需要补充 constant 函数
  'function-no-unknown': [true, { ignoreFunctions: ['v-bind', 'constant'] }],
} satisfies Config['rules']
