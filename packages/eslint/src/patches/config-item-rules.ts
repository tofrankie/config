import type { ConfigItemRulePreset } from '../presets'
import type { PatchApplier } from '../types'
import { CONFIG_ITEM_RULE_PRESETS } from '../presets'

/**
 * These rule families do not have an equivalent antfu integration-overrides
 * path that we can merge into before calling `antfu()`. They must stay as
 * post-antfu config-item patches and be applied onto a specific named item.
 */
const CONFIG_ITEM_RULE_TARGETS = {
  'eslint-comments/': 'antfu/eslint-comments/rules',
  'jsdoc/': 'antfu/jsdoc/rules',
  'node/': 'antfu/node/rules',
  'pnpm/': 'antfu/pnpm/pnpm-workspace-yaml',
} as const satisfies Record<string, string>

export const applyConfigItemRulePatches: PatchApplier = (composer, options) => {
  for (const preset of CONFIG_ITEM_RULE_PRESETS) {
    if (preset.option != null && !options[preset.option]) {
      continue
    }

    const targetName = resolveConfigItemTarget(preset)
    if (!targetName) {
      continue
    }

    composer.override(targetName, {
      rules: preset.rules,
    })
  }
}

function resolveConfigItemTarget(preset: ConfigItemRulePreset): string | null {
  const ruleIds = Object.keys(preset.rules)

  if (ruleIds.length === 0) {
    warnIgnoredPreset(preset.name, 'it does not define any rules')
    return null
  }

  if (ruleIds.some(ruleId => !ruleId.includes('/'))) {
    warnIgnoredPreset(
      preset.name,
      'package presets should not contain built-in rules; only plugin-prefixed rules can be auto-routed'
    )
    return null
  }

  const targetNames = new Set<string>()

  for (const ruleId of ruleIds) {
    const targetName = findConfigItemTarget(ruleId)

    if (!targetName) {
      warnIgnoredPreset(preset.name, `no config-item target is registered for rule "${ruleId}"`)
      return null
    }

    targetNames.add(targetName)
  }

  if (targetNames.size !== 1) {
    warnIgnoredPreset(preset.name, `its rules map to multiple config items (${Array.from(targetNames).join(', ')})`)
    return null
  }

  return Array.from(targetNames)[0]
}

function findConfigItemTarget(ruleId: string): string | undefined {
  for (const [rulePrefix, targetName] of Object.entries(CONFIG_ITEM_RULE_TARGETS)) {
    if (ruleId.startsWith(rulePrefix)) {
      return targetName
    }
  }

  return undefined
}

function warnIgnoredPreset(name: string, reason: string): void {
  const processLike = Reflect.get(globalThis, 'process')

  if (isObjectLike(processLike) && 'emitWarning' in processLike && typeof processLike.emitWarning === 'function') {
    processLike.emitWarning(`[@tofrankie/eslint] Ignore config-item preset "${name}": ${reason}.`)
  }
}

function isObjectLike(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}
