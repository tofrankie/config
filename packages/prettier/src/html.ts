import type { Options } from 'prettier'
import organizeAttributes from './organize-attributes'

export default {
  parser: 'html',
  plugins: [organizeAttributes],
  attributeSort: 'ASC',
  attributeIgnoreCase: true,
  // TODO: Consider the order of width, height, and style attributes
  attributeGroups: ['$CODE_GUIDE'], // https://codeguide.co/#attribute-order
} satisfies Options
