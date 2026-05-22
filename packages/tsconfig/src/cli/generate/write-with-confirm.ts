import { existsSync, writeFileSync } from 'node:fs'
import { isCancel, multiselect } from '@clack/prompts'
import ansis from 'ansis'

interface WriteOptions {
  force?: boolean
}

interface WriteEntry {
  path: string
  content: string
}

interface WriteResult {
  written: string[]
  skipped: string[]
}

export async function writeWithConfirm(
  entries: WriteEntry[],
  options: WriteOptions = {}
): Promise<WriteResult> {
  const written: string[] = []
  const skipped: string[] = []

  if (options.force) {
    for (const entry of entries) {
      writeFileSync(entry.path, entry.content)
      written.push(entry.path)
    }
    return { written, skipped }
  }

  const conflicts = entries.filter(entry => existsSync(entry.path))
  const createOnly = entries.filter(entry => !existsSync(entry.path))

  for (const entry of createOnly) {
    writeFileSync(entry.path, entry.content)
    written.push(entry.path)
  }

  if (conflicts.length === 0) return { written, skipped }

  const selected = await multiselect({
    message: `Select existing files to overwrite ${ansis.dim('(↑/↓ to navigate, <space> to toggle, <enter> to confirm)')}`,
    options: conflicts.map(entry => ({ value: entry.path, label: entry.path })),
    required: false,
  })
  if (isCancel(selected)) process.exit(1)

  const selectedSet = new Set<string>(selected)
  for (const entry of conflicts) {
    if (selectedSet.has(entry.path)) {
      writeFileSync(entry.path, entry.content)
      written.push(entry.path)
    } else {
      skipped.push(entry.path)
    }
  }

  return { written, skipped }
}
