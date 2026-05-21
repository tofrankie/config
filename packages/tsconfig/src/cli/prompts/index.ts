import type { Bundler, CliArgs, PromptResult, Shape, Stack, TestRunner } from '../types'
import { confirm, isCancel, select } from '@clack/prompts'
import { detectProject } from '../detect/detect-project'

function asStack(value: unknown): Stack {
  return value as Stack
}

function asShape(value: unknown): Shape {
  return value as Shape
}

function asTestRunner(value: unknown): TestRunner {
  return value as TestRunner
}

function asBundler(value: unknown): Bundler {
  return value as Bundler
}

export async function runPrompts(args: CliArgs): Promise<PromptResult> {
  const detected = detectProject()

  const detectedStack: Stack =
    args.stack ?? (detected.hasReact ? 'react' : detected.hasVue ? 'vue' : 'node')
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
    return {
      stack: detectedStack,
      shape: args.shape ?? 'app',
      test: args.test ?? 'none',
      bundler: detectedBundler,
      yes: !!args.yes,
      install: !!args.install,
      force: !!args.force,
    }
  }

  const stack =
    args.stack ??
    (await select({
      message: 'Select stack',
      options: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'node', label: 'Node' },
        { value: 'web', label: 'Web' },
      ],
      initialValue: detectedStack,
    }))
  if (isCancel(stack)) process.exit(1)

  const shape =
    args.shape ??
    (await select({
      message: 'Select shape',
      options: [
        { value: 'app', label: 'App' },
        { value: 'lib', label: 'Lib' },
      ],
    }))
  if (isCancel(shape)) process.exit(1)

  const test =
    args.test ??
    (await select({
      message: 'Select test',
      options: [
        { value: 'vitest', label: 'Vitest' },
        { value: 'none', label: 'None' },
        { value: 'other', label: 'Other (same as none)' },
      ],
    }))
  if (isCancel(test)) process.exit(1)

  const bundler =
    args.bundler ??
    (await select({
      message: 'Select bundler',
      options: [
        { value: 'vite', label: 'Vite' },
        { value: 'rollup', label: 'Rollup' },
        { value: 'tsdown', label: 'Tsdown' },
        { value: 'tsup', label: 'Tsup' },
        { value: 'none', label: 'None' },
        { value: 'other', label: 'Other' },
      ],
      initialValue: detectedBundler,
    }))
  if (isCancel(bundler)) process.exit(1)

  const install =
    args.install ??
    (await confirm({
      message: 'Install required dependencies now?',
      initialValue: true,
    }))
  if (isCancel(install)) process.exit(1)

  return {
    stack: asStack(stack),
    shape: asShape(shape),
    test: asTestRunner(test),
    bundler: asBundler(bundler),
    yes: !!args.yes,
    install: !!install,
    force: !!args.force,
  }
}
