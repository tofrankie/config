import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/cli/index.ts',
  format: ['esm'],
  dts: false,
  clean: true,
  target: 'node20',
})
