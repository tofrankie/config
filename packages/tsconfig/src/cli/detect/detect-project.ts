import type { DetectedProject } from '../types'
import { existsSync, readFileSync } from 'node:fs'

interface PackageJsonLike {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export function detectProject(cwd = process.cwd()): DetectedProject {
  const pkgPath = `${cwd}/package.json`
  if (!existsSync(pkgPath)) {
    return {
      hasReact: false,
      hasVue: false,
      hasVite: false,
      hasRollup: false,
      hasTsdown: false,
      hasTsup: false,
    }
  }

  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as PackageJsonLike
  const deps = {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  }

  return {
    hasReact: !!deps.react,
    hasVue: !!deps.vue,
    hasVite: !!deps.vite,
    hasRollup: !!deps.rollup,
    hasTsdown: !!deps.tsdown,
    hasTsup: !!deps.tsup,
  }
}
