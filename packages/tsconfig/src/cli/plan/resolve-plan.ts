import type { PromptResult, ResolvePlanResult, Shape, Stack } from '../types'

export function resolvePlan(input: PromptResult): ResolvePlanResult {
  const preset = resolvePreset(input.stack, input.shape)
  const testPreset =
    input.test === 'vitest'
      ? input.stack === 'node'
        ? 'vitest.node.json'
        : 'vitest.web.json'
      : undefined

  const files: import('../types').PlanFile[] = []

  if (input.stack === 'node') {
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

  const deps = ['typescript', '@tofrankie/tsconfig']
  if (input.test === 'vitest') deps.push('vitest', '@types/node')
  if (input.bundler === 'vite') deps.push('vite')

  return {
    preset,
    testPreset,
    bundler: input.bundler,
    files,
    deps: Array.from(new Set(deps)),
    force: input.force,
  }
}

function resolvePreset(stack: Stack, shape: Shape): string {
  if (stack === 'react') return shape === 'lib' ? 'react.lib.json' : 'react.app.json'
  if (stack === 'vue') return shape === 'lib' ? 'vue.lib.json' : 'vue.app.json'
  if (stack === 'node') return shape === 'lib' ? 'node.lib.json' : 'node.app.json'
  return 'web.app.json'
}
