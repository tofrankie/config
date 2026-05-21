#!/usr/bin/env node

import { outro } from '@clack/prompts'
import { parseArgs } from './args/index'
import { generateFiles } from './generate/generate-files'
import { installDeps } from './install/install-deps'
import { resolvePlan } from './plan/resolve-plan'
import { runPrompts } from './prompts/index'

export async function main(): Promise<void> {
  const argv = parseArgs(process.argv)
  const promptResult = await runPrompts(argv)
  const plan = resolvePlan(promptResult)
  const result = await generateFiles(plan)

  if (promptResult.install) {
    await installDeps(plan)
  }

  outro(`done: written ${result.written.length}, skipped ${result.skipped.length}`)
}
