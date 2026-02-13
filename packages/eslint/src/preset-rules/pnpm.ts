import type { Linter } from 'eslint'

/**
 * - rule: `pnpm/*`
 * - plugin: `eslint-plugin-pnpm`
 * @see https://github.com/antfu/eslint-config
 * @see https://github.com/antfu/pnpm-workspace-utils/tree/main/packages/eslint-plugin-pnpm
 */
export const PNPM_PRESET_RULES: Linter.RulesRecord = {
  'pnpm/yaml-enforce-settings': 'off',
}
