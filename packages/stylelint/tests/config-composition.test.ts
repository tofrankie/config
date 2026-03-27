import path from 'node:path'
import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

const FIXTURE_ROOT = path.resolve(import.meta.dirname, 'fixtures')

const cases = [
  { name: 'standard', fixture: 'standard', files: ['index.css', 'index.html', 'other.css'] },
  { name: 'scss', fixture: 'scss', files: ['index.scss'] },
  { name: 'vue', fixture: 'vue', files: ['index.vue'] },
  { name: 'vue-scss', fixture: 'vue-scss', files: ['index.vue'] },
  { name: 'miniprogram', fixture: 'miniprogram', files: ['index.wxss', 'index.wxml'] },
  { name: 'uniapp', fixture: 'uniapp', files: ['vue3.vue', 'global.vue'] },
  { name: 'uniapp-scss', fixture: 'uniapp-scss', files: ['index.vue'] },
  { name: 'min-pixel', fixture: 'min-pixel', files: ['index.css'] },
  { name: 'wechat-svg', fixture: 'wechat-svg', files: ['index.html'] },
] as const

describe('@tofrankie/stylelint fixture projects', () => {
  for (const testCase of cases) {
    it(`passes fixture: ${testCase.name}`, async () => {
      const cwd = path.join(FIXTURE_ROOT, testCase.fixture)
      const files = testCase.files.map(file => path.join(cwd, file))
      const configFile = path.join(cwd, 'stylelint.config.js')

      const result = await stylelint.lint({
        cwd,
        files,
        configFile,
      })

      const warningMessages = result.results.flatMap(item =>
        item.warnings.map(warning => {
          const line = warning.line ?? 0
          const column = warning.column ?? 0
          return `${path.basename(item.source ?? '')}:${line}:${column} [${warning.rule}] ${warning.text}`
        })
      )

      expect(
        warningMessages,
        `fixture "${testCase.name}" lint failed:\n${warningMessages.join('\n')}`
      ).toEqual([])
    })
  }
})
