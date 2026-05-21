import type { ResolvePlanResult } from '../types'
import { execaCommand } from 'execa'
import { choosePackageManager } from './choose-pm'

export async function installDeps(plan: ResolvePlanResult): Promise<void> {
  const pm = choosePackageManager()
  if (plan.deps.length === 0) return

  const cmd =
    pm === 'pnpm'
      ? `pnpm add -D ${plan.deps.join(' ')}`
      : pm === 'yarn'
        ? `yarn add -D ${plan.deps.join(' ')}`
        : pm === 'bun'
          ? `bun add -d ${plan.deps.join(' ')}`
          : `npm i -D ${plan.deps.join(' ')}`

  await execaCommand(cmd, { stdio: 'inherit' })
}
