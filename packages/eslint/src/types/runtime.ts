import type { Composer } from './define-config'

export type JsdocMode = 'antfu' | 'managed'

export interface ResolvedConfigOptions {
  e18e: boolean
  jsdoc: boolean
  jsdocMode: JsdocMode
  lessOpinionated: boolean
  node: boolean
  pnpm: boolean
  react: boolean
  stylistic: boolean
  test: boolean
  typescript: boolean
  typescriptTypeAware: boolean
  unicorn: boolean
  vue: boolean
}

export type PatchApplier = (composer: Composer, options: ResolvedConfigOptions) => void
