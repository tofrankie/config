import path from 'node:path'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import raycast from '../src/configs/raycast.js'

const FIXTURE_ROOT = path.resolve(import.meta.dirname, 'fixtures')

describe('@tofrankie/eslint/raycast', () => {
  it('exports a package.json-scoped flat config', () => {
    expect(raycast.name).toBe('tofrankie/raycast/package-json')
    expect(raycast.files).toEqual(['**/package.json'])
    expect(raycast.language).toBe('jsonc/json')
  })

  it('passes the sorted Raycast package.json fixture', async () => {
    const cwd = path.join(FIXTURE_ROOT, 'raycast')
    const eslint = new ESLint({
      cwd,
      overrideConfig: [raycast],
      overrideConfigFile: true,
    })

    const result = await eslint.lintFiles(['package.json'])
    const messages = result.flatMap(item =>
      item.messages.map(message => {
        const relativeFile = path.relative(cwd, item.filePath)
        return `${relativeFile}:${message.line ?? 0}:${message.column ?? 0} [${message.ruleId}] ${message.message}`
      })
    )

    expect(messages, `fixture "raycast" lint failed:\n${messages.join('\n')}`).toEqual([])
  })
})
