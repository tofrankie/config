import baseOptions from '@tofrankie/prettier'
import htmlOptions from '@tofrankie/prettier/options/sort-html'
import miniappOptions from '@tofrankie/prettier/options/sort-miniapp'
import vueOptions from '@tofrankie/prettier/options/sort-vue'

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
      options: miniappOptions,
    },
  ],
}
