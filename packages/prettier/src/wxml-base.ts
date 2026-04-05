import type { Options } from 'prettier'
import wxmlPlugin from '@tofrankie/prettier-plugin-wxml'

export default {
  plugins: [wxmlPlugin],
  parser: 'wxml',
} satisfies Options
