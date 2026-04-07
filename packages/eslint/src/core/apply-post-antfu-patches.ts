import type { Composer, ResolvedConfigOptions } from '../types'
import { configItemPatches } from '../patches'

/**
 * Post-antfu patches only live here.
 * Most package defaults should be merged into AntfuOptions before `antfu()`
 * so user overrides keep the same semantics as plain @antfu/eslint-config.
 */
export function applyPostAntfuPatches(composer: Composer, options: ResolvedConfigOptions): void {
  for (const applyPatch of configItemPatches) {
    applyPatch(composer, options)
  }
}
