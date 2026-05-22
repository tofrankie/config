import type {
  BUNDLERS,
  PACKAGE_MANAGERS,
  PROJECT_TYPES,
  RUNTIMES,
  TECH_STACKS,
  TEST_RUNNERS,
} from './constants'

export type Runtime = (typeof RUNTIMES)[number]
export type TechStack = (typeof TECH_STACKS)[number]
export type ProjectType = (typeof PROJECT_TYPES)[number]
export type TestRunner = (typeof TEST_RUNNERS)[number]
export type Bundler = (typeof BUNDLERS)[number]
export type PackageManager = (typeof PACKAGE_MANAGERS)[number]

export interface CliArgs {
  version?: boolean
  runtime?: Runtime
  techStack?: TechStack
  projectType?: ProjectType
  test?: TestRunner
  bundler?: Bundler
  yes?: boolean
  install?: boolean
  force?: boolean
}

export interface PromptResult {
  runtime: Runtime
  techStack: TechStack
  projectType: ProjectType
  test: TestRunner
  bundler: Bundler
  yes: boolean
  install: boolean
  selectedDeps: string[]
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
