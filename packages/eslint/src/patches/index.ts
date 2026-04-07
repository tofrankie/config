import type { PatchApplier } from '../types'
import { applyConfigItemRulePatches } from './config-item-rules'
import { applyJsdocPatch } from './jsdoc'

export { applyConfigItemRulePatches, applyJsdocPatch }

export const configItemPatches: PatchApplier[] = [applyConfigItemRulePatches, applyJsdocPatch]
