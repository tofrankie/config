import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/options/base.ts',
    'src/options/sort-html.ts',
    'src/options/sort-vue.ts',
    'src/options/sort-miniprogram.ts',
    'src/options/sort-wechat-svg.ts',
    'src/options/wxml.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'node18',
})
