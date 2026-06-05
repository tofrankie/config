import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    raycast: 'src/configs/raycast.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'node18',
})
