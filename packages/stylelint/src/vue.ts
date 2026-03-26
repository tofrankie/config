import type { Config } from 'stylelint'
import { STANDARD_LANGUAGE_OPTIONS } from './language-options'
import { VUE_SHARED_RULES } from './shared-rules'
import { mergeLanguageOptions } from './utils/merge-language-options'

export default {
  languageOptions: mergeLanguageOptions(STANDARD_LANGUAGE_OPTIONS),
  // https://github.com/ota-meshi/stylelint-config-standard-vue
  extends: ['stylelint-config-standard-vue'],
  overrides: [
    {
      files: ['**/*.vue'],
      rules: { ...VUE_SHARED_RULES },
    },
  ],
} satisfies Config
