import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/base.ts',
    'src/html.ts',
    'src/organize-attributes.ts',
    'src/vue.ts',
    'src/wechat-svg.ts',
    'src/wxml-base.ts',
    'src/wxml.ts',
  ],
  format: ['esm', 'cjs'],
  // Keep default + named exports for ESM, while making CJS consumers use `.default`
  // or named destructuring instead of treating `require('@tofrankie/prettier')` as base.
  cjsDefault: false,
  dts: true,
  clean: true,
  target: 'node18',
})
