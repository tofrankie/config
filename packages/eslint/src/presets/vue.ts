import type { ConfigItemRules } from '../types'

export const VUE_RULES = {
  // Delegated to Prettier
  'vue/singleline-html-element-content-newline': 'off',
  'vue/html-closing-bracket-newline': 'off',
  'vue/html-indent': 'off',

  'vue/html-self-closing': [
    'warn',
    {
      html: {
        void: 'always', // Keep consistent with Prettier
        normal: 'always', // Follow Vue Style Guide
        component: 'always',
      },
      svg: 'always',
      math: 'always',
    },
  ],
} satisfies ConfigItemRules
