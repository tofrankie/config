import type { CliArgs } from '../types'
import { Command } from 'commander'
import { BUNDLERS, SHAPES, STACKS, TEST_RUNNERS } from '../constants'

export function parseArgs(argv: string[]): CliArgs {
  const program = new Command('tsconfig')

  const stackSet = new Set<string>(STACKS)
  const shapeSet = new Set<string>(SHAPES)
  const testSet = new Set<string>(TEST_RUNNERS)
  const bundlerSet = new Set<string>(BUNDLERS)

  function parseStack(value: string): CliArgs['stack'] {
    if (!stackSet.has(value)) throw new Error(`Invalid --stack: ${value}`)
    return value as CliArgs['stack']
  }

  function parseShape(value: string): CliArgs['shape'] {
    if (!shapeSet.has(value)) throw new Error(`Invalid --shape: ${value}`)
    return value as CliArgs['shape']
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
    .option('--stack <stack>', 'react|vue|node|web', parseStack)
    .option('--shape <shape>', 'app|lib', parseShape)
    .option('--test <test>', 'vitest|none|other', parseTest)
    .option('--bundler <bundler>', 'vite|rollup|tsdown|tsup|none|other', parseBundler)
    .option('--yes', 'non-interactive mode')
    .option('--install', 'install dependencies')
    .option('--force', 'overwrite all existing files')

  program.parse(argv)
  return program.opts<CliArgs>()
}
