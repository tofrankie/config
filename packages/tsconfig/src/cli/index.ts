#!/usr/bin/env node

import process from 'node:process'
import * as p from '@clack/prompts'
import ansis from 'ansis'
import pkg from '../../package.json'
import { parseArgs } from './args/index'
import { generateFiles } from './generate/generate-files'
import { installDeps } from './install/install-deps'
import { resolvePlan } from './plan/resolve-plan'
import { CLI_CANCELLED, runPrompts } from './prompts/index'

process.on('SIGINT', () => {
  p.cancel('Operation canceled.')
  process.exit(130)
})

main().catch(error => {
  if (error instanceof Error && error.message === CLI_CANCELLED) {
    process.exit(130)
  }

  process.stdout.write('\n')
  process.stderr.write(`${String(error)}\n`)
  process.stdout.write('\n')
  process.exit(1)
})

async function main(): Promise<void> {
  const argv = parseArgs(process.argv)
  if (argv.version) {
    process.stdout.write(`${pkg.version}\n`)
    return
  }

  process.stdout.write('\n')
  p.intro(`${pkg.name} ${ansis.dim(`v${pkg.version}`)}`)

  const promptResult = await runPrompts(argv)

  p.log.step('Generate tsconfig files')
  const plan = resolvePlan(promptResult)
  const result = await generateFiles(plan)

  if (promptResult.install) {
    p.log.step('Install selected dependencies')
    await installDeps(plan)
  }

  p.outro(`done: written ${result.written.length}, skipped ${result.skipped.length}`)
}
