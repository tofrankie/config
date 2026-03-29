/**
 * Mirror npm package JSON referenced by src presets into base/scope/pkg/...
 * Rewrite extends in emitted root presets to ./base/...
 */

import type { Node as JsonNode } from 'jsonc-parser'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getNodeValue, parseTree } from 'jsonc-parser'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgRoot = join(__dirname, '..')
const srcDir = join(pkgRoot, 'src')
const require = createRequire(join(pkgRoot, 'package.json'))

main()

function main(): void {
  const baseDir = join(pkgRoot, 'base')
  if (existsSync(baseDir)) rmSync(baseDir, { recursive: true })
  mkdirSync(baseDir, { recursive: true })

  const srcFiles = readdirSync(srcDir).filter(f => f.endsWith('.json'))
  const allRefs = new Set<string>()
  for (const f of srcFiles) {
    const text = readFileSync(join(srcDir, f), 'utf8')
    for (const r of collectNpmExtends(text)) allRefs.add(r)
  }

  const queue: Array<{ absSrc: string; absDest: string }> = []
  const seenDest = new Set<string>()

  function enqueue(absSrc: string, absDest: string): void {
    if (seenDest.has(absDest)) return
    seenDest.add(absDest)
    queue.push({ absSrc, absDest })
  }

  for (const ref of allRefs) {
    enqueue(resolveNpmFile(ref), npmRefToDestPath(ref))
  }

  while (queue.length > 0) {
    const task = queue.pop()
    if (!task) continue
    const { absSrc, absDest } = task
    mkdirSync(dirname(absDest), { recursive: true })

    const text = readFileSync(absSrc, 'utf8')
    const out = rewriteExtendsValues(text, from => {
      if (from.startsWith('@') || isBarePackageExtends(from)) {
        const depSrc = resolveNpmFile(from)
        const depDest = npmRefToDestPath(from)
        enqueue(depSrc, depDest)
        return normalizeRelativeImportPath(relative(dirname(absDest), depDest))
      }

      if (from.startsWith('.')) {
        const depSrc = resolve(dirname(absSrc), from)
        if (!existsSync(depSrc)) {
          console.warn(
            `[tsconfig build] cannot resolve nested relative extends "${from}" from "${absSrc}"`
          )
          return from
        }
        const depDest = resolve(dirname(absDest), from)
        enqueue(depSrc, depDest)
        return normalizeRelativeImportPath(relative(dirname(absDest), depDest))
      }

      return from
    })

    writeFileSync(absDest, out.endsWith('\n') ? out : `${out}\n`)
  }

  const mapRef = (from: string) =>
    from.startsWith('@') || isBarePackageExtends(from) ? npmRefToBaseRelative(from) : from

  for (const f of srcFiles) {
    const name = f.replace(/\.json$/i, '.json')
    const text = readFileSync(join(srcDir, f), 'utf8')
    const out = rewriteExtendsValues(text, mapRef)
    writeFileSync(join(pkgRoot, name), out.endsWith('\n') ? out : `${out}\n`)
  }

  console.log(
    `[tsconfig build] wrote ${srcFiles.length} presets and mirrored ${seenDest.size} upstream files.`
  )
}

function collectNpmExtends(text: string): Set<string> {
  const refs = new Set<string>()
  const root = parseTree(text, [])
  const valNode = findRootExtendsValueNode(root)
  for (const sn of rootExtendsStringNodes(valNode)) {
    const v = getJsonStringValue(sn)
    if (v && (v.startsWith('@') || isBarePackageExtends(v))) refs.add(v)
  }
  return refs
}

function rewriteExtendsValues(text: string, mapRef: (from: string) => string): string {
  const root = parseTree(text, [])
  const replacements: Array<{ offset: number; length: number; newText: string }> = []
  const valNode = findRootExtendsValueNode(root)
  for (const val of rootExtendsStringNodes(valNode)) {
    const v = getJsonStringValue(val)
    if (!v) continue
    const mapped = mapRef(v)
    if (!mapped || mapped === v) continue
    if (val.offset === undefined) continue
    replacements.push({
      offset: val.offset,
      length: val.length,
      newText: JSON.stringify(mapped),
    })
  }

  replacements.sort((a, b) => b.offset - a.offset)
  let out = text
  for (const r of replacements) {
    out = out.slice(0, r.offset) + r.newText + out.slice(r.offset + r.length)
  }
  return out
}

function npmRefToBaseRelative(ref: string): string {
  if (ref.startsWith('@')) {
    const m = ref.match(/^@([^/]+)\/([^/]+)\/(.+)$/)
    if (!m) throw new Error(`Invalid scoped extends: ${ref}`)
    const [, scope, pkg, sub] = m
    return `./base/${scope}/${pkg}/${sub}`
  }
  const m = ref.match(/^([^/@][^/]*)\/(.+)$/)
  if (!m) throw new Error(`Invalid unscoped extends: ${ref}`)
  const [, pkg, sub] = m
  return `./base/_/${pkg}/${sub}`
}

function resolveNpmFile(ref: string): string {
  try {
    return require.resolve(ref, { paths: [pkgRoot] })
  } catch (e) {
    throw new Error(`Cannot resolve extends "${ref}" from ${pkgRoot}: ${e}`)
  }
}

function npmRefToDestPath(ref: string): string {
  if (ref.startsWith('@')) {
    const m = ref.match(/^@([^/]+)\/([^/]+)\/(.+)$/)
    if (!m) throw new Error(`Invalid scoped extends: ${ref}`)
    const [, scope, pkg, sub] = m
    return join(pkgRoot, 'base', scope, pkg, sub)
  }
  const m = ref.match(/^([^/@][^/]*)\/(.+)$/)
  if (!m) throw new Error(`Invalid unscoped extends: ${ref}`)
  const [, pkg, sub] = m
  return join(pkgRoot, 'base', '_', pkg, sub)
}

function normalizeRelativeImportPath(p: string): string {
  const normalized = p.replaceAll('\\', '/')
  return normalized.startsWith('.') ? normalized : `./${normalized}`
}

function isBarePackageExtends(v: string | null | undefined): boolean {
  if (!v || v.startsWith('.') || v.startsWith('@')) return false
  return /^[\w.-]+\/.+/.test(v)
}

function findRootExtendsValueNode(root: JsonNode | undefined): JsonNode | undefined {
  if (root?.type !== 'object' || !root.children) return undefined
  for (const prop of root.children) {
    if (prop.type !== 'property' || !prop.children || prop.children.length < 2) continue
    const keyNode = prop.children[0]
    const valNode = prop.children[1]
    if (keyNode?.type === 'string' && keyNode.value === 'extends') {
      return valNode
    }
  }
  return undefined
}

/**
 * String nodes that are extends targets (single string or array of strings).
 * @param valNode
 */
function rootExtendsStringNodes(valNode: JsonNode | undefined): JsonNode[] {
  if (!valNode) return []
  if (valNode.type === 'string') return [valNode]
  if (valNode.type === 'array' && valNode.children) {
    return valNode.children.filter(c => c.type === 'string')
  }
  return []
}

function getJsonStringValue(node: JsonNode | undefined): string | null {
  if (!node || node.type !== 'string') return null
  return getNodeValue(node) as string
}
