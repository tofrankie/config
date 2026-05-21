import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'jsonc-parser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(__dirname, '..')
const srcDir = join(pkgRoot, 'src', 'presets')
const require = createRequire(import.meta.url)

interface TsconfigLike extends Record<string, unknown> {
  extends?: string | string[]
  $schema?: string
  _version?: string
}

main()

function main(): void {
  ensureDir(srcDir)

  const presetFiles = readdirSync(srcDir)
    .filter(f => f.endsWith('.json'))
    .sort()
  for (const file of presetFiles) {
    const abs = join(srcDir, file)
    const flattened = flattenConfig(abs, new Set<string>())
    delete flattened.extends
    delete flattened.$schema
    delete flattened._version
    writeFileSync(join(pkgRoot, file), `${JSON.stringify(flattened, null, 2)}\n`)
  }
  console.log(`[tsconfig build] wrote ${presetFiles.length} flattened preset files`)
}

function flattenConfig(absPath: string, seen: Set<string>): TsconfigLike {
  const key = absPath
  if (seen.has(key)) {
    throw new Error(`Circular extends detected: ${[...seen, key].join(' -> ')}`)
  }

  const raw = parse(readFileSync(absPath, 'utf8')) as TsconfigLike
  const nextSeen = new Set(seen)
  nextSeen.add(key)

  const chain = normalizeExtends(raw.extends)
  let merged: TsconfigLike = {}

  for (const ref of chain) {
    const resolved = resolveExtends(absPath, ref)
    const baseConfig = flattenConfig(resolved, nextSeen)
    merged = deepMerge(merged, baseConfig)
  }

  const local: TsconfigLike = { ...raw }
  delete local.extends
  merged = deepMerge(merged, local)
  return merged
}

function normalizeExtends(value: TsconfigLike['extends']): string[] {
  if (!value) return []
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.filter(v => typeof v === 'string')
  return []
}

function resolveExtends(fromFile: string, ref: string): string {
  if (ref.startsWith('.')) {
    const p = resolve(dirname(fromFile), ref)
    return p.endsWith('.json') ? p : `${p}.json`
  }
  try {
    return require.resolve(ref, { paths: [dirname(fromFile), pkgRoot] })
  } catch {
    throw new Error(`Cannot resolve extends "${ref}" from ${fromFile}`)
  }
}

function deepMerge(a: TsconfigLike, b: TsconfigLike): TsconfigLike {
  if (!isObject(a) || !isObject(b)) return structuredClone(b)

  const out: TsconfigLike = { ...a }
  for (const [k, v] of Object.entries(b)) {
    if (!(k in out)) {
      out[k] = structuredClone(v)
      continue
    }

    const prev = out[k]
    if (Array.isArray(prev) && Array.isArray(v)) {
      out[k] = structuredClone(v) as TsconfigLike[typeof k]
      continue
    }

    if (isObject(prev) && isObject(v)) {
      out[k] = deepMerge(prev, v) as TsconfigLike[typeof k]
      continue
    }

    out[k] = structuredClone(v) as TsconfigLike[typeof k]
  }

  return out
}

function isObject(v: unknown): v is TsconfigLike {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function ensureDir(dir: string): void {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}
