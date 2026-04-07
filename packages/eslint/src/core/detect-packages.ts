import { findUpSync } from 'find-up-simple'
import { isPackageExists } from 'local-pkg'

export function detectPackage(name: string): boolean {
  return isPackageExists(name)
}

export function detectPnpmWorkspaceYaml(cwd?: string): boolean {
  return findUpSync('pnpm-workspace.yaml', cwd === undefined ? undefined : { cwd }) !== undefined
}
