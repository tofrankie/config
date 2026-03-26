import type { Config } from 'stylelint'
import { MINIAPP_LANGUAGE_OPTIONS, STANDARD_LANGUAGE_OPTIONS } from './language-options'
import { MINIAPP_SHARED_RULES } from './shared-rules/miniapp'
import { mergeLanguageOptions } from './utils/merge-language-options'

const miniappLanguageOptions = mergeLanguageOptions(
  STANDARD_LANGUAGE_OPTIONS,
  MINIAPP_LANGUAGE_OPTIONS
)

export default {
  overrides: [
    {
      files: ['**/*.wxss'],
      customSyntax: 'postcss',
      languageOptions: miniappLanguageOptions,
      rules: { ...MINIAPP_SHARED_RULES },
    },
    {
      files: ['**/*.wxml'],
      customSyntax: 'postcss-html',
      languageOptions: miniappLanguageOptions,
      rules: {
        ...MINIAPP_SHARED_RULES,
        'function-url-quotes': 'never',
      },
    },
  ],
} satisfies Config
