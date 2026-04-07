import path from 'node:path'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { defineConfig } from '../src/index.js'

const FIXTURE_ROOT = path.resolve(import.meta.dirname, 'fixtures/unused-vars')

describe('@tofrankie/eslint unused-vars strategy', () => {
  it('reports a single rule source per file type', async () => {
    const overrideConfig = await defineConfig({
      jsdoc: false,
      vue: true,
    }).toConfigs()
    const eslint = new ESLint({
      cwd: FIXTURE_ROOT,
      overrideConfig,
      overrideConfigFile: true,
    })

    const results = await eslint.lintFiles(['src/index.js', 'src/index.ts', 'src/App.vue', 'src/app-js.vue'])
    const byFile = Object.fromEntries(
      results.map(result => [
        path.relative(FIXTURE_ROOT, result.filePath),
        result.messages.map(message => message.ruleId),
      ])
    )

    expect(byFile['src/index.js']).toEqual(['no-unused-vars'])
    expect(byFile['src/index.ts']).toEqual(['ts/no-unused-vars'])
    expect(byFile['src/App.vue']).toEqual(['ts/no-unused-vars'])
    expect(byFile['src/app-js.vue']).toEqual(['ts/no-unused-vars'])
  })
})
