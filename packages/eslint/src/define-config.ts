import type { AntfuOptions, Composer, UserFlatConfig } from './types'
import antfu from '@antfu/eslint-config'
import { applyPostAntfuPatches } from './core/apply-post-antfu-patches'
import { composePreset } from './core/compose-preset'
import { mergeOptions } from './core/merge-options'
import { mergePreset } from './core/merge-preset'
import { resolveAntfuOptions } from './core/resolve-antfu-options'
import { resolveConfigOptions } from './core/resolve-config-options'

export function defineConfig(
  antfuOptions?: AntfuOptions,
  ...userFlatConfigs: UserFlatConfig[]
): Composer {
  const userOptions = antfuOptions ?? {}
  const resolvedConfigOptions = resolveConfigOptions(userOptions)
  const preset = composePreset(resolvedConfigOptions)
  const mergedOptions = mergePreset(userOptions, preset)
  const resolvedOptions = resolveAntfuOptions(mergedOptions)
  const composerOptions = resolveComposerOptions(
    resolvedOptions,
    resolvedConfigOptions.jsdocMode,
    resolvedConfigOptions.jsdoc
  )
  const composer = antfu(composerOptions, ...(userFlatConfigs as any))

  applyPostAntfuPatches(composer, resolvedConfigOptions)

  return composer
}

function resolveComposerOptions(
  options: AntfuOptions,
  jsdocMode: 'antfu' | 'managed',
  jsdocEnabled: boolean
): AntfuOptions {
  if (!jsdocEnabled || jsdocMode !== 'managed') {
    return options
  }

  return mergeOptions({ jsdoc: false }, options) as AntfuOptions
}
