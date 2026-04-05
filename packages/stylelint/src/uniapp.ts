import type { Config } from 'stylelint'
import { BASE_LANGUAGE_OPTIONS, MINIPROGRAM_LANGUAGE_OPTIONS } from './language-options'
import { MINIPROGRAM_SHARED_RULES } from './shared-rules/miniprogram'
import { mergeLanguageOptions } from './utils/merge-language-options'

const miniprogramLanguageOptions = mergeLanguageOptions(BASE_LANGUAGE_OPTIONS, MINIPROGRAM_LANGUAGE_OPTIONS)

export default {
  overrides: [
    {
      files: ['**/*.vue'],
      languageOptions: miniprogramLanguageOptions,
      rules: { ...MINIPROGRAM_SHARED_RULES },
    },
  ],
} satisfies Config
