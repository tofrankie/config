import type { Options } from 'prettier'
import wxmlOptions from './wxml'

// https://prettier.io/docs/options
// https://github.com/NiklasPor/prettier-plugin-organize-attributes
export default {
  ...wxmlOptions,

  // @tofrankie/prettier-plugin-wxml options
  wxmlOrganizeAttributes: true,

  // prettier-plugin-organize-attributes options
  attributeSort: 'ASC',
  attributeIgnoreCase: true,
  attributeGroups: [
    '^for$',
    '^(if|elif|else)$',
    '^key$',
    '^for-item$',
    '^for-index$',
    '^slot$',
    '^id$',
    '^class$',
    '^hover-class$',
    '^hover-',
    '$DEFAULT',
    '^tap$',
    '^bind',
    '^catch',
    '^on',
    '^worklet',
  ],
} satisfies Options
