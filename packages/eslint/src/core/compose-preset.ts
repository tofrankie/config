import type { AntfuOptions, ResolvedConfigOptions } from '../types'
import { INTEGRATION_RULE_PRESETS } from '../presets'

export function composePreset(options: ResolvedConfigOptions): Partial<AntfuOptions> {
  const preset: Partial<AntfuOptions> = {}

  // Integration presets should merge through antfu's supported overrides paths
  // so package defaults and user `foo.overrides` land in the same config item
  // and follow the same precedence model without relying on antfu's deprecated
  // top-level `overrides` option. Package presets intentionally stop here:
  // config-item-specific defaults (for example `node/*` or `pnpm/*`) are
  // applied later as post-antfu patches instead of top-level fused rules.
  for (const integrationRulePreset of INTEGRATION_RULE_PRESETS) {
    if (!isPresetEnabled(integrationRulePreset.option, integrationRulePreset.expected, options)) {
      continue
    }

    mergeRulesIntoIntegrationOptions(preset, integrationRulePreset.key, integrationRulePreset.rules)
  }

  return preset
}

function mergeRulesIntoIntegrationOptions(
  preset: Partial<AntfuOptions>,
  key: keyof AntfuOptions,
  rules: NonNullable<AntfuOptions['rules']>
): void {
  const currentValue = preset[key]
  const currentOptions = isObjectLike(currentValue) ? currentValue : {}
  const currentOverrides =
    isObjectLike(currentOptions) && 'overrides' in currentOptions && isObjectLike(currentOptions.overrides)
      ? currentOptions.overrides
      : {}

  ;(preset as Record<string, unknown>)[key] = {
    ...currentOptions,
    overrides: {
      ...currentOverrides,
      ...rules,
    },
  }
}

function isObjectLike(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null
}

function isPresetEnabled(
  option: keyof ResolvedConfigOptions | undefined,
  expected: boolean | undefined,
  options: ResolvedConfigOptions
): boolean {
  if (option == null) {
    return true
  }

  return options[option] === (expected ?? true)
}
