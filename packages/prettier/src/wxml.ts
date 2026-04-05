import type { Options } from 'prettier'
import wxmlBase from './wxml-base'

export default {
  ...wxmlBase,

  // https://github.com/tofrankie/prettier-plugin-wxml
  wxmlStrict: true,
  wxmlFormat: true,
  wxmlSelfClose: true,
  wxmlOrganizeAttributes: true,

  // https://github.com/NiklasPor/prettier-plugin-organize-attributes
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
