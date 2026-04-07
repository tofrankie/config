import { base, html, vue, wxml } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['*.html'],
      options: html,
    },
    {
      files: ['*.vue'],
      options: vue,
    },
    {
      files: ['*.wxml'],
      options: wxml,
    },
  ],
}
