import type { CliArgs } from '../types'
import { Command } from 'commander'
import { BUNDLERS, PROJECT_TYPES, RUNTIMES, TECH_STACKS, TEST_RUNNERS } from '../constants'

export function parseArgs(argv: string[]): CliArgs {
  const normalizedArgv =
    argv.length >= 3 && argv[2] === 'help'
      ? [argv[0] ?? 'node', argv[1] ?? 'tsconfig', '--help']
      : argv

  const program = new Command('tsconfig')

  const runtimeSet = new Set<string>(RUNTIMES)
  const techStackSet = new Set<string>(TECH_STACKS)
  const projectTypeSet = new Set<string>(PROJECT_TYPES)
  const testSet = new Set<string>(TEST_RUNNERS)
  const bundlerSet = new Set<string>(BUNDLERS)

  function parseRuntime(value: string): CliArgs['runtime'] {
    if (!runtimeSet.has(value)) throw new Error(`Invalid --runtime: ${value}`)
    return value as CliArgs['runtime']
  }

  function parseTechStack(value: string): CliArgs['techStack'] {
    if (!techStackSet.has(value)) throw new Error(`Invalid --tech-stack: ${value}`)
    return value as CliArgs['techStack']
  }

  function parseProjectType(value: string): CliArgs['projectType'] {
    if (!projectTypeSet.has(value)) throw new Error(`Invalid --project-type: ${value}`)
    return value as CliArgs['projectType']
  }

  function parseTest(value: string): CliArgs['test'] {
    if (!testSet.has(value)) throw new Error(`Invalid --test: ${value}`)
    return value as CliArgs['test']
  }

  function parseBundler(value: string): CliArgs['bundler'] {
    if (!bundlerSet.has(value)) throw new Error(`Invalid --bundler: ${value}`)
    return value as CliArgs['bundler']
  }

  program
    .option('-v, --version', 'print version')
    .option('--runtime <runtime>', 'node|browser', parseRuntime)
    .option('--tech-stack <techStack>', 'react|vue|other|none', parseTechStack)
    .option('--project-type <projectType>', 'app|lib', parseProjectType)
    .option('--test <test>', 'vitest|none|other', parseTest)
    .option('--bundler <bundler>', 'vite|rollup|tsdown|tsup|none|other', parseBundler)
    .option('--yes', 'non-interactive mode')
    .option('--install', 'install dependencies')
    .option('--force', 'overwrite all existing files')

  program.parse(normalizedArgv)
  return program.opts<CliArgs>()
}
