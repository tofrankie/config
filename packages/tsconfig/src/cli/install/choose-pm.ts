import type { PackageManager } from '../types'
import { existsSync } from 'node:fs'

export function choosePackageManager(cwd = process.cwd()): PackageManager {
  if (existsSync(`${cwd}/pnpm-lock.yaml`)) return 'pnpm'
  if (existsSync(`${cwd}/yarn.lock`)) return 'yarn'
  if (existsSync(`${cwd}/package-lock.json`)) return 'npm'
  if (existsSync(`${cwd}/bun.lockb`) || existsSync(`${cwd}/bun.lock`)) return 'bun'
  return 'npm'
}
