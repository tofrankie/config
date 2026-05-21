import type { WriteStatus } from '../types'
import { existsSync, writeFileSync } from 'node:fs'
import { confirm } from '@clack/prompts'

interface WriteOptions {
  force?: boolean
}

export async function writeWithConfirm(
  file: string,
  content: string,
  options: WriteOptions = {}
): Promise<WriteStatus> {
  if (!existsSync(file) || options.force) {
    writeFileSync(file, content)
    return 'written'
  }

  const ok = await confirm({ message: `File ${file} exists, overwrite?`, initialValue: false })
  if (!ok) return 'skipped'
  writeFileSync(file, content)
  return 'written'
}
