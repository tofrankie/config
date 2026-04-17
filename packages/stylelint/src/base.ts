import type { Config } from 'stylelint'
import { IGNORE_FILES } from './constants'
import { BASE_LANGUAGE_OPTIONS } from './language-options'
import { mergeLanguageOptions } from './utils/merge-language-options'

// https://stylelint.io/user-guide/options/
export default {
  ignoreFiles: IGNORE_FILES,
  languageOptions: mergeLanguageOptions(BASE_LANGUAGE_OPTIONS),
  extends: [
    // https://github.com/stylelint/stylelint-config-standard
    'stylelint-config-standard',
    // https://github.com/stormwarning/stylelint-config-recess-order
    'stylelint-config-recess-order',
    // https://github.com/ota-meshi/stylelint-config-html - HTML only (no Vue/Svelte/etc.)
    'stylelint-config-html/html',
  ],
  // https://github.com/stylelint-stylistic/stylelint-stylistic
  // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/docs/user-guide/rules.md
  // https://github.com/stylelint-stylistic/stylelint-config
  // https://github.com/stylelint-stylistic/stylelint-config/blob/main/stylelint.config.js
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    'comment-empty-line-before': null,
    'function-url-quotes': 'always',
    'function-no-unknown': [true, { ignoreFunctions: ['constant'] }], // Requires `languageOptions` to be combined
    // TODO: Does not work for inline styles. To automatically add spaces between two properties, use Prettier after Stylelint. The temporary solution is to run Stylelint first, then Prettier.
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/declaration-block-semicolon-space-after/README.md
    // https://github.com/stylelint-stylistic/stylelint-stylistic/issues/49
    '@stylistic/declaration-block-semicolon-space-after': 'always-single-line',
    // https://github.com/stylelint-stylistic/stylelint-stylistic/blob/main/lib/rules/string-quotes/README.md#options
    '@stylistic/string-quotes': ['single', { avoidEscape: true }],
  },
} satisfies Config
