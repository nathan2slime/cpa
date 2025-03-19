import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  bundle: true,
  noExternal: ['@t3-oss/env-core'],
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true
})
