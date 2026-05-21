import type { BUNDLERS, PACKAGE_MANAGERS, SHAPES, STACKS, TEST_RUNNERS } from './constants'

export type Stack = (typeof STACKS)[number]
export type Shape = (typeof SHAPES)[number]
export type TestRunner = (typeof TEST_RUNNERS)[number]
export type Bundler = (typeof BUNDLERS)[number]
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export interface CliArgs {
  stack?: Stack
  shape?: Shape
  test?: TestRunner
  bundler?: Bundler
  yes?: boolean
  install?: boolean
  force?: boolean
}

export interface PromptResult {
  stack: Stack
  shape: Shape
  test: TestRunner
  bundler: Bundler
  yes: boolean
  install: boolean
  force: boolean
}

export interface DetectedProject {
  hasReact: boolean
  hasVue: boolean
  hasVite: boolean
  hasRollup: boolean
  hasTsdown: boolean
  hasTsup: boolean
}

export interface PlanFile {
  path: string
  extends?: string
  shape?: TsconfigShape
}

export interface ResolvePlanResult {
  preset: string
  testPreset?: string
  bundler: Bundler
  files: PlanFile[]
  deps: string[]
  force: boolean
}

export interface TsconfigShape {
  extends?: string
  files?: string[]
  references?: { path: string }[]
  compilerOptions?: {
    moduleResolution?: 'bundler' | 'nodenext'
    types?: string[]
    [key: string]: unknown
  }
  [key: string]: unknown
}

export type WriteStatus = 'written' | 'skipped'

export interface GenerateResult {
  written: string[]
  skipped: string[]
}
