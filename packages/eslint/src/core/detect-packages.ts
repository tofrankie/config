import { isPackageExists } from 'local-pkg'

export function detectPackage(name: string): boolean {
  return isPackageExists(name)
}
