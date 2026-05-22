import type { GenerateResult, ResolvePlanResult } from '../types'
import { mergeTsconfig } from './merge-tsconfig'
import { writeWithConfirm } from './write-with-confirm'

export async function generateFiles(plan: ResolvePlanResult): Promise<GenerateResult> {
  const entries: Array<{ path: string; content: string }> = []

  for (const f of plan.files) {
    const baseConfig = f.shape ? f.shape : { extends: f.extends }
    const merged = mergeTsconfig(baseConfig, { bundler: plan.bundler })
    entries.push({
      path: f.path,
      content: `${JSON.stringify(merged, null, 2)}\n`,
    })
  }

  return writeWithConfirm(entries, { force: plan.force })
}
