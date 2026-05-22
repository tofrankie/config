import type { ProjectType, PromptResult, ResolvePlanResult, Runtime, TechStack } from '../types'

export function resolvePlan(input: PromptResult): ResolvePlanResult {
  const preset = resolvePreset(input.runtime, input.techStack, input.projectType)
  const testPreset =
    input.test === 'vitest'
      ? input.runtime === 'node'
        ? 'vitest.node.json'
        : 'vitest.web.json'
      : undefined

  const files: import('../types').PlanFile[] = []

  if (input.runtime === 'node') {
    files.push({ path: 'tsconfig.json', extends: `@tofrankie/tsconfig/${preset}` })
  } else {
    const rootShape: import('../types').TsconfigShape = {
      files: [],
      references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }],
    }
    if (testPreset) {
      rootShape.references!.push({ path: './tsconfig.test.json' })
    }

    files.push(
      { path: 'tsconfig.json', shape: rootShape },
      { path: 'tsconfig.app.json', extends: `@tofrankie/tsconfig/${preset}` },
      { path: 'tsconfig.node.json', extends: '@tofrankie/tsconfig/node.app.json' }
    )
  }

  if (testPreset)
    files.push({ path: 'tsconfig.test.json', extends: `@tofrankie/tsconfig/${testPreset}` })

  const deps = ['typescript']
  if (input.test === 'vitest') deps.push('vitest', '@types/node')
  if (input.bundler === 'vite') deps.push('vite')
  const selectedDeps =
    Array.isArray(input.selectedDeps) && input.selectedDeps.length > 0 ? input.selectedDeps : deps

  return {
    preset,
    testPreset,
    bundler: input.bundler,
    files,
    deps: Array.from(new Set(selectedDeps)),
    force: input.force,
  }
}

function resolvePreset(runtime: Runtime, techStack: TechStack, projectType: ProjectType): string {
  if (runtime === 'node') return projectType === 'lib' ? 'node.lib.json' : 'node.app.json'
  if (techStack === 'react') return projectType === 'lib' ? 'react.lib.json' : 'react.app.json'
  if (techStack === 'vue') return projectType === 'lib' ? 'vue.lib.json' : 'vue.app.json'
  return 'web.app.json'
}
