import type { Config } from 'stylelint'
import { MINIPROGRAM_LANGUAGE_OPTIONS, STANDARD_LANGUAGE_OPTIONS } from './language-options'
import { MINIPROGRAM_SHARED_RULES } from './shared-rules/miniprogram'
import { mergeLanguageOptions } from './utils/merge-language-options'

const miniprogramLanguageOptions = mergeLanguageOptions(
  STANDARD_LANGUAGE_OPTIONS,
  MINIPROGRAM_LANGUAGE_OPTIONS
)

export default {
  overrides: [
    {
      files: ['**/*.wxss'],
      customSyntax: 'postcss',
      languageOptions: miniprogramLanguageOptions,
      rules: {
        ...MINIPROGRAM_SHARED_RULES,
        'no-empty-source': null,
      },
    },
    {
      files: ['**/*.wxml'],
      customSyntax: '@tofrankie/postcss-wxml',
      languageOptions: miniprogramLanguageOptions,
      rules: {
        ...MINIPROGRAM_SHARED_RULES,
        'no-empty-source': null,
      },
    },
  ],
} satisfies Config
