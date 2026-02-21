import type { Options } from 'prettier'
import organizeAttributes from '../plugin-organize-attributes'

// https://prettier.io/docs/options
// https://github.com/NiklasPor/prettier-plugin-organize-attributes
export default {
  parser: 'html',
  plugins: [organizeAttributes],
  attributeSort: 'ASC',
  attributeIgnoreCase: true,
  attributeGroups: ['$CODE_GUIDE'],
} satisfies Options
