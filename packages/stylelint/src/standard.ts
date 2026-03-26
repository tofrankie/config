import type { Config } from 'stylelint'
import { IGNORE_FILES } from './constants'
import { STANDARD_LANGUAGE_OPTIONS } from './language-options'
import { mergeLanguageOptions } from './utils/merge-language-options'

// https://stylelint.io/user-guide/options/
export default {
  ignoreFiles: IGNORE_FILES,
  languageOptions: mergeLanguageOptions(STANDARD_LANGUAGE_OPTIONS),
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
    // https://github.com/ota-meshi/stylelint-config-html — HTML only (no Vue/Svelte/etc.)
    'stylelint-config-html/html',
  ],
  // https://github.com/stylelint-stylistic/stylelint-stylistic
  // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/docs/user-guide/rules.md
  // https://github.com/stylelint-stylistic/stylelint-config
  // https://github.com/stylelint-stylistic/stylelint-config/blob/main/stylelint.config.js
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'function-url-quotes': 'always',
    'function-no-unknown': [true, { ignoreFunctions: ['constant'] }], // 需与 languageOptions 配合使用
    // TODO: 对内联样式不起作用，如果要在两个属性之间自动添加空格，得用 Prettier 处理，临时解决方案是先 stylelint 再 prettier
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-after/README.md
    '@stylistic/declaration-block-semicolon-space-after': 'always-single-line',
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md#options
    '@stylistic/string-quotes': ['single', { avoidEscape: true }],
  },
  overrides: [
    {
      files: ['**/*.html'],
      rules: {
        // HTML files default to unquoted url()
        'function-url-quotes': 'never',
      },
    },
  ],
} satisfies Config
