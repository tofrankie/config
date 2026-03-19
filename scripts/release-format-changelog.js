import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

/**
 * Release changelog formatting script
 * After version updates, it replaces `## 0.0.1` with `## pkg@0.0.1 (YYYY-MM-DD)`.
 */
function formatChangelog() {
  const packagesDir = path.join(rootDir, 'packages')
  const packages = fs.readdirSync(packagesDir)

  for (const pkg of packages) {
    const pkgPath = path.join(packagesDir, pkg)
    const changelogPath = path.join(pkgPath, 'CHANGELOG.md')
    const packageJsonPath = path.join(pkgPath, 'package.json')

    if (fs.existsSync(changelogPath) && fs.existsSync(packageJsonPath)) {
      const pkgName = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')).name
      const content = fs.readFileSync(changelogPath, 'utf8')

      const newContent = content.replace(/^## (\d+\.\d+\.\d+)/gm, (match, version) => {
        if (match.includes('@') && match.includes('(')) return match
        return `## ${pkgName}@${version} (${date})`
      })

      if (content !== newContent) {
        fs.writeFileSync(changelogPath, newContent)
        console.log(`✅ Formatted CHANGELOG for ${pkgName}`)
      }
    }
  }
}

formatChangelog()
