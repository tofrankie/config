import type { Options } from 'prettier'

// https://prettier.io/docs/options
// https://github.com/NiklasPor/prettier-plugin-organize-attributes
export default {
  parser: 'html',
  plugins: ['prettier-plugin-organize-attributes'],
  attributeSort: 'ASC',
  attributeIgnoreCase: true,
  attributeGroups: ['$DEFAULT'],
} satisfies Options
