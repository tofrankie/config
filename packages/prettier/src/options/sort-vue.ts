import type { Options } from 'prettier'
import organizeAttributes from '../plugin-organize-attributes'

// https://prettier.io/docs/options
// https://github.com/NiklasPor/prettier-plugin-organize-attributes
export default {
  parser: 'vue',
  plugins: [organizeAttributes],
  attributeSort: 'ASC',
  attributeIgnoreCase: true,
  attributeGroups: [
    // https://github.com/NiklasPor/prettier-plugin-organize-attributes/issues/3#issuecomment-1796376738
    '^((v-bind)?:?|v-)is$',
    '^v-for$',
    '^v-(if|else-if|else|show|cloak)$',
    '^v-(once|pre|memo)$',
    '^(v-bind)?:?id$',
    '^(v-bind)?:?key$',
    '^(v-bind)?:?ref$',
    '^(v-)?slot$',
    '^#',
    '^v-model$',
    '^v-(?!bind(:|$)|on(:|$)|html$|text$)',
    '^class$',
    '^(v-bind)?:class$',
    '^((v-bind)?:)?(?!data-|v-|:|@|#)',
    '$DEFAULT',
    '^((v-bind)?:)?data-',
    '^v-bind$',
    '^v-on:',
    '^@',
    '^v-html$',
    '^v-text$',
  ],
} satisfies Options
