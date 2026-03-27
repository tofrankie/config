import baseOptions from '@tofrankie/prettier'
import htmlOptions from '@tofrankie/prettier/options/sort-html'
import miniprogramOptions from '@tofrankie/prettier/options/sort-miniprogram'
import vueOptions from '@tofrankie/prettier/options/sort-vue'
import wxmlOptions from '@tofrankie/prettier/options/wxml'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.html'],
      options: htmlOptions,
    },
    {
      files: ['*.vue'],
      options: vueOptions,
    },
    {
      files: ['*.wxml'],
      options: miniprogramOptions,
    },
    {
      files: ['*.wxml'],
      options: wxmlOptions,
    },
  ],
}
