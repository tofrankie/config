import type { Config } from 'stylelint'
import { BASE_LANGUAGE_OPTIONS } from './language-options'
import { VUE_SHARED_RULES } from './shared-rules'
import { mergeLanguageOptions } from './utils/merge-language-options'

export default {
  languageOptions: mergeLanguageOptions(BASE_LANGUAGE_OPTIONS),
  // https://github.com/ota-meshi/stylelint-config-standard-vue#with-scss
  extends: ['stylelint-config-standard-vue/scss'],
  overrides: [
    {
      files: ['**/*.vue'],
      rules: { ...VUE_SHARED_RULES },
    },
  ],
} satisfies Config
