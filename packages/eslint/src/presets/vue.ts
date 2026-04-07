import type { TypedFlatConfigItem } from '../types'

export const vueRules = {
  'vue/singleline-html-element-content-newline': 'off',
  'vue/html-closing-bracket-newline': 'off',
  'vue/html-indent': 'off',
  'vue/html-self-closing': [
    'warn',
    {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    },
  ],
} satisfies NonNullable<TypedFlatConfigItem['rules']>
