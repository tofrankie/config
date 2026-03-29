import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const pkgRoot = join(fileURLToPath(new URL('.', import.meta.url)), '..')

function walk(dir: string, acc: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, acc)
    else acc.push(p.slice(pkgRoot.length + 1).replaceAll('\\', '/'))
  }
  return acc.sort()
}

describe('@tofrankie/tsconfig build', () => {
  it('runs build', () => {
    execSync('pnpm build', { cwd: pkgRoot, stdio: 'pipe' })
  })

  it('rewrites scoped npm extends to ./base/scope/pkg/...', () => {
    const strict = readFileSync(join(pkgRoot, 'strict.json'), 'utf8')
    expect(strict).toContain('"./base/tsconfig/strictest/tsconfig.json"')
  })

  it('rewrites array extends (react.vite)', () => {
    const text = readFileSync(join(pkgRoot, 'react.vite.json'), 'utf8')
    expect(text).toContain('"./base/tsconfig/vite-react/tsconfig.json"')
    expect(text).toContain('"./react.json"')
  })

  it('keeps local ./ extends unchanged', () => {
    const text = readFileSync(join(pkgRoot, 'react.json'), 'utf8')
    expect(text).toContain('"./dom.json"')
  })

  it('node.json extends strict then node20 snapshot', () => {
    const text = readFileSync(join(pkgRoot, 'node.json'), 'utf8')
    expect(text).toContain('"./strict.json"')
    expect(text).toContain('"./base/tsconfig/node20/tsconfig.json"')
  })

  it('mirrors expected upstream files under base/', () => {
    const files = walk(join(pkgRoot, 'base'))
    expect(files).toMatchInlineSnapshot(`
      [
        "base/tsconfig/node20/tsconfig.json",
        "base/tsconfig/strictest/tsconfig.json",
        "base/tsconfig/vite-react/tsconfig.json",
        "base/vue/tsconfig/tsconfig.dom.json",
        "base/vue/tsconfig/tsconfig.json",
        "base/vue/tsconfig/tsconfig.lib.json",
      ]
    `)
  })

  it('mirrors and keeps nested relative extends resolvable', () => {
    const text = readFileSync(join(pkgRoot, 'base/vue/tsconfig/tsconfig.dom.json'), 'utf8')
    expect(text).toContain('"./tsconfig.json"')
  })
})
