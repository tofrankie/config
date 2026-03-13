import type { Config } from 'stylelint'

export default {
  // https://github.com/ota-meshi/stylelint-config-recommended-vue
  extends: ['stylelint-config-recommended-vue'],
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
} satisfies Config
