import type { Bundler, TsconfigShape } from '../types'

interface MergeOptions {
  bundler: Bundler
}

export function mergeTsconfig(base: TsconfigShape, options: MergeOptions): TsconfigShape {
  const out = structuredClone(base)
  if (!out.extends) {
    return out
  }

  out.compilerOptions ??= {}

  if (['vite', 'rollup', 'tsdown', 'tsup'].includes(options.bundler)) {
    out.compilerOptions.moduleResolution = 'bundler'
  } else {
    out.compilerOptions.moduleResolution = 'nodenext'
  }

  const isAppEnv =
    out.extends.includes('react') || out.extends.includes('vue') || out.extends.includes('web')

  if (options.bundler === 'vite' && isAppEnv) {
    const types = Array.isArray(out.compilerOptions.types) ? out.compilerOptions.types : []
    out.compilerOptions.types = Array.from(new Set([...types, 'vite/client']))
  }

  return out
}
