import type { Config } from 'stylelint'
import { IGNORE_FILES } from './constants'

// https://stylelint.io/user-guide/options/
export default {
  ignoreFiles: IGNORE_FILES,
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
  ],
  // https://github.com/stylelint-stylistic/stylelint-stylistic
  // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/docs/user-guide/rules.md
  // https://github.com/stylelint-stylistic/stylelint-config
  // https://github.com/stylelint-stylistic/stylelint-config/blob/main/stylelint.config.js
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'function-url-quotes': 'never',
    // TODO: inline style 重新排序后，`;` 之后下一个属性之前无法添加空格。
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-after/README.md
    '@stylistic/declaration-block-semicolon-space-after': 'always-single-line',
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md#options
    '@stylistic/string-quotes': ['single', { avoidEscape: true }],
  },
  overrides: [
    {
      files: ['**/*.html'],
      // TODO: 需要额外添加 postcss-html 依赖
      customSyntax: 'postcss-html',
    },
  ],
} satisfies Config
