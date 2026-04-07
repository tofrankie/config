import type { PatchApplier, TypedFlatConfigItem } from '../types'
import { jsdoc } from 'eslint-plugin-jsdoc'
import { jsdocJavaScriptRules, jsdocTypeScriptRules } from '../presets'

const SHARED_SETTINGS = {
  tagNamePreference: {
    description: 'desc',
    property: 'prop',
    returns: 'return',
  },
} as const

export const applyJsdocPatch: PatchApplier = (composer, options) => {
  if (!options.jsdoc) {
    return
  }

  if (options.jsdocMode === 'managed') {
    // Managed mode disables antfu's built-in jsdoc config first, then inserts
    // our own jsdoc-generated config items before `antfu/disables`.
    composer.insertBefore('antfu/disables', ...buildManagedJsdocItems())
    return
  }

  // In antfu mode, keep antfu's built-in jsdoc setup and only append our
  // extra rule/settings layers right after `antfu/jsdoc/rules`.
  composer.insertAfter('antfu/jsdoc/rules', ...buildAntfuJsdocItems())
}

function buildManagedJsdocItems(): TypedFlatConfigItem[] {
  return [
    ...toConfigItems(
      jsdoc({
        config: 'flat/recommended-typescript-flavor-error',
        files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
        rules: jsdocJavaScriptRules,
        settings: SHARED_SETTINGS,
      })
    ),
    ...toConfigItems(
      jsdoc({
        config: 'flat/recommended-typescript-error',
        files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
        rules: jsdocTypeScriptRules,
        settings: SHARED_SETTINGS,
      })
    ),
  ]
}

function buildAntfuJsdocItems(): TypedFlatConfigItem[] {
  return [
    {
      name: 'tofrankie/jsdoc/javascript',
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: jsdocJavaScriptRules,
      settings: SHARED_SETTINGS,
    },
    {
      name: 'tofrankie/jsdoc/typescript',
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      rules: jsdocTypeScriptRules,
      settings: SHARED_SETTINGS,
    },
  ]
}

function toConfigItems(config: TypedFlatConfigItem | TypedFlatConfigItem[]): TypedFlatConfigItem[] {
  return Array.isArray(config) ? config : [config]
}
