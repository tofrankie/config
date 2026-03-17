import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    standard: 'src/standard.ts',
    miniapp: 'src/miniapp.ts',
    uniapp: 'src/uniapp.ts',
    'min-pixel': 'src/min-pixel.ts',
    scss: 'src/scss.ts',
    vue: 'src/vue.ts',
    'vue-scss': 'src/vue-scss.ts',
    'wechat-svg': 'src/wechat-svg.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'node18',
})
