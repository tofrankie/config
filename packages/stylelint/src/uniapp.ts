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
      files: ['**/*.vue'],
      languageOptions: miniappLanguageOptions,
      rules: { ...MINIAPP_SHARED_RULES },
    },
  ],
} satisfies Config
