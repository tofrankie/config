import type { Options } from 'prettier'
import organizeAttributes from '../plugin-organize-attributes'

// https://prettier.io/docs/options
// https://github.com/NiklasPor/prettier-plugin-organize-attributes
export default {
  parser: 'html',
  printWidth: 450,
  htmlWhitespaceSensitivity: 'ignore',
  plugins: [organizeAttributes],
  attributeSort: 'ASC',
  attributeGroups: [
    '^xmlns$',
    '^viewBox$',
    '^preserveAspectRatio$',
    '^id$',
    '^name',
    '^class$',
    '^x$',
    '^cx$',
    '^y$',
    '^cy$',
    '^_?width$',
    '^_?height$',
    '^r$',
    '^opacity$',

    '^attributeName$',
    '^attributeType$',
    '^type$',
    '^begin$',
    '^end$',
    '^dur$',
    '^from$',
    '^to$',
    '^by$',
    '^values$',
    '^keyTimes$',
    '^keySplines$',
    '^calcMode$',
    '^repeatCount$',
    '^repeatDur$',
    '^fill$',
    '^restart$',
    '^accumulate$',
    '^additive$',

    '^stroke*$',
    '^style$',
    '^src$',
    '^href$',
    '^d$',

    '^data-*$',
    '^version$',
  ],
} satisfies Options
