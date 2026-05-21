import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const pkgRoot = join(fileURLToPath(new URL('.', import.meta.url)), '../..')

describe('@tofrankie/tsconfig v2 build', () => {
  it('runs build', () => {
    execSync('pnpm build', { cwd: pkgRoot, stdio: 'pipe' })
  }, 20000)

  it('emits v2 preset files', () => {
    const files = [
      'strict.json',
      'web.app.json',
      'react.app.json',
      'vue.app.json',
      'node.app.json',
      'node.lib.json',
      'react.lib.json',
      'vue.lib.json',
      'vitest.web.json',
      'vitest.node.json',
    ]

    for (const f of files) {
      const text = readFileSync(join(pkgRoot, f), 'utf8')
      expect(text.length).toBeGreaterThan(10)
    }
  })

  it('emits cli entry', () => {
    const text = readFileSync(join(pkgRoot, 'dist/index.mjs'), 'utf8')
    expect(text.length).toBeGreaterThan(10)
  })
})
