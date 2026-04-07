import type { AntfuOptions, ResolvedConfigOptions } from '../types'
import { detectPackage, detectPnpmWorkspaceYaml } from './detect-packages'
import { INTERNAL_JSDOC_MODE } from './jsdoc-mode'

export function resolveConfigOptions(options: AntfuOptions): ResolvedConfigOptions {
  const typescript = isAutoDetectedEnabled(options.typescript, 'typescript')
  const typescriptTypeAware =
    typescript &&
    isOptionObject(options.typescript) &&
    'tsconfigPath' in options.typescript &&
    Boolean(options.typescript.tsconfigPath)

  return {
    e18e: isEnabledByDefault(options.e18e),
    jsdoc: isEnabledByDefault(options.jsdoc),
    jsdocMode: INTERNAL_JSDOC_MODE,
    lessOpinionated: options.lessOpinionated === true,
    node: isEnabledByDefault(options.node),
    pnpm: isPnpmEnabled(options.pnpm),
    react: isExplicitlyEnabled(options.react),
    stylistic: isEnabledByDefault(options.stylistic),
    test: isEnabledByDefault(options.test),
    typescript,
    typescriptTypeAware,
    unicorn: isEnabledByDefault(options.unicorn),
    vue: isAutoDetectedEnabled(options.vue, 'vue'),
  }
}

function isEnabledByDefault(value: unknown): boolean {
  return value !== false
}

function isExplicitlyEnabled(value: unknown): boolean {
  return value === true || isOptionObject(value)
}

function isPnpmEnabled(pnpmOption: unknown): boolean {
  if (pnpmOption === false) {
    return false
  }
  if (isExplicitlyEnabled(pnpmOption)) {
    return true
  }

  // `pnpm` defaults on when `pnpm-workspace.yaml` is found
  return detectPnpmWorkspaceYaml()
}

function isAutoDetectedEnabled(value: unknown, packageName: string): boolean {
  if (value === false) {
    return false
  }

  return isExplicitlyEnabled(value) || detectPackage(packageName)
}

function isOptionObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
