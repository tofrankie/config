import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    base: 'src/base.ts',
    miniprogram: 'src/miniprogram.ts',
    pxtorem: 'src/pxtorem.ts',
    scss: 'src/scss.ts',
    uniapp: 'src/uniapp.ts',
    vue: 'src/vue.ts',
    'vue-scss': 'src/vue-scss.ts',
    'wechat-svg': 'src/wechat-svg.ts',
  },
  format: ['esm', 'cjs'],
  // Keep default + named exports for ESM, while making CJS consumers use `.default`
  // or named destructuring instead of treating `require('@tofrankie/stylelint')` as base.
  cjsDefault: false,
  dts: true,
  clean: true,
  target: 'node18',
})
