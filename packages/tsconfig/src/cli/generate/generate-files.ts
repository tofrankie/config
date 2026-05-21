import type { GenerateResult, ResolvePlanResult } from '../types'
import { mergeTsconfig } from './merge-tsconfig'
import { writeWithConfirm } from './write-with-confirm'

export async function generateFiles(plan: ResolvePlanResult): Promise<GenerateResult> {
  const written: string[] = []
  const skipped: string[] = []

  for (const f of plan.files) {
    const baseConfig = f.shape ? f.shape : { extends: f.extends }
    const merged = mergeTsconfig(baseConfig, { bundler: plan.bundler })
    const status = await writeWithConfirm(f.path, `${JSON.stringify(merged, null, 2)}\n`, {
      force: plan.force,
    })
    if (status === 'written') written.push(f.path)
    else skipped.push(f.path)
  }

  return { written, skipped }
}
