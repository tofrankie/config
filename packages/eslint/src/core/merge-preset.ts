import type { AntfuOptions } from '../types'
import { mergeOptions } from './merge-options'

export function mergePreset(
  userOptions: AntfuOptions,
  preset: Partial<AntfuOptions>
): AntfuOptions {
  const mergedOptions = mergeOptions(userOptions, preset) as AntfuOptions

  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'e18e')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'react')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'stylistic')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'test')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'typescript')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'unicorn')
  restoreBooleanObjectPreset(mergedOptions, userOptions, preset, 'vue')

  return mergedOptions
}

function restoreBooleanObjectPreset(
  mergedOptions: AntfuOptions,
  userOptions: AntfuOptions,
  preset: Partial<AntfuOptions>,
  key: 'e18e' | 'react' | 'stylistic' | 'test' | 'typescript' | 'unicorn' | 'vue'
): void {
  if (userOptions[key] !== true) {
    return
  }

  const presetValue = preset[key]
  if (!isObjectLike(presetValue)) {
    return
  }

  mergedOptions[key] = mergeOptions({}, presetValue) as AntfuOptions[typeof key]
}

function isObjectLike(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}
