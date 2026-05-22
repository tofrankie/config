import type {
  Bundler,
  CliArgs,
  ProjectType,
  PromptResult,
  Runtime,
  TechStack,
  TestRunner,
} from '../types'
import { cancel, isCancel, multiselect, select } from '@clack/prompts'
import ansis from 'ansis'
import { detectProject } from '../detect/detect-project'
import { resolvePlan } from '../plan/resolve-plan'

export const CLI_CANCELLED = '__TSCONFIG_CLI_CANCELLED__'

function abortPrompt(): never {
  cancel('Operation canceled.')
  throw new Error(CLI_CANCELLED)
}

function asProjectType(value: unknown): ProjectType {
  return value as ProjectType
}

function asTestRunner(value: unknown): TestRunner {
  return value as TestRunner
}

function asBundler(value: unknown): Bundler {
  return value as Bundler
}

function asRuntime(value: unknown): Runtime {
  return value as Runtime
}

function asTechStack(value: unknown): TechStack {
  return value as TechStack
}

export async function runPrompts(args: CliArgs): Promise<PromptResult> {
  const detected = detectProject()

  const detectedRuntime: Runtime = detected.hasReact || detected.hasVue ? 'browser' : 'node'
  const detectedTechStack: TechStack = detected.hasReact
    ? 'react'
    : detected.hasVue
      ? 'vue'
      : 'other'
  const detectedBundler: Bundler =
    args.bundler ??
    (detected.hasVite
      ? 'vite'
      : detected.hasRollup
        ? 'rollup'
        : detected.hasTsdown
          ? 'tsdown'
          : detected.hasTsup
            ? 'tsup'
            : 'none')

  if (args.yes) {
    const runtime = args.runtime ?? detectedRuntime
    const techStack = runtime === 'node' ? 'none' : (args.techStack ?? detectedTechStack)
    const draft: PromptResult = {
      runtime,
      techStack,
      projectType: args.projectType ?? 'app',
      test: args.test ?? 'none',
      bundler: detectedBundler,
      yes: true,
      install: !!args.install,
      selectedDeps: [],
      force: !!args.force,
    }
    const deps = resolvePlan(draft).deps
    const selectedDeps = args.install ? deps : []
    return {
      ...draft,
      install: selectedDeps.length > 0,
      selectedDeps,
    }
  }

  const runtime =
    args.runtime ??
    (await select({
      message: `Select project runtime ${ansis.dim('(↑/↓ to navigate, <enter> to confirm)')}`,
      options: [
        { value: 'browser', label: 'Browser' },
        { value: 'node', label: 'Node.js' },
      ],
      initialValue: detectedRuntime,
    }))
  if (isCancel(runtime)) abortPrompt()
  const runtimeValue = asRuntime(runtime)

  const techStack =
    runtimeValue === 'node'
      ? 'none'
      : (args.techStack ??
        (await select({
          message: `Select tech stack ${ansis.dim('(↑/↓ to navigate, <enter> to confirm)')}`,
          options: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'other', label: 'Other' },
            { value: 'none', label: 'None' },
          ],
          initialValue: detectedTechStack,
        })))
  if (isCancel(techStack)) abortPrompt()

  const projectType =
    args.projectType ??
    (await select({
      message: `Select project type ${ansis.dim('(↑/↓ to navigate, <enter> to confirm)')}`,
      options: [
        { value: 'app', label: 'Application' },
        { value: 'lib', label: 'Library package' },
      ],
    }))
  if (isCancel(projectType)) abortPrompt()

  const test =
    args.test ??
    (await select({
      message: `Select test library ${ansis.dim('(↑/↓ to navigate, <enter> to confirm)')}`,
      options: [
        { value: 'vitest', label: 'Vitest' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' },
      ],
    }))
  if (isCancel(test)) abortPrompt()

  const bundler =
    args.bundler ??
    (await select({
      message: `Select bundler tool ${ansis.dim('(↑/↓ to navigate, <enter> to confirm)')}`,
      options: [
        { value: 'vite', label: 'Vite' },
        { value: 'tsdown', label: 'Tsdown' },
        { value: 'rollup', label: 'Rollup' },
        { value: 'tsup', label: 'Tsup' },
        { value: 'other', label: 'Other' },
        { value: 'none', label: 'None' },
      ],
      initialValue: detectedBundler,
    }))
  if (isCancel(bundler)) abortPrompt()

  const draft: PromptResult = {
    runtime: runtimeValue,
    techStack: asTechStack(techStack),
    projectType: asProjectType(projectType),
    test: asTestRunner(test),
    bundler: asBundler(bundler),
    yes: !!args.yes,
    install: !!args.install,
    selectedDeps: [],
    force: !!args.force,
  }

  const deps = resolvePlan(draft).deps
  const selectedDeps =
    args.install === true
      ? deps
      : args.install === false
        ? []
        : ((await multiselect({
            message: `Select dependencies to install ${ansis.dim('(↑/↓ to navigate, <space> to toggle, <enter> to confirm)')}`,
            options: deps.map(dep => ({ value: dep, label: dep })),
            initialValues: [],
            required: false,
          })) as string[])
  if (isCancel(selectedDeps)) abortPrompt()

  return {
    ...draft,
    install: selectedDeps.length > 0,
    selectedDeps,
  }
}
