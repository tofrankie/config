import path from 'node:path'
import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'
import { base, miniprogram, pxtorem, scss, uniapp, vue, vueScss, wechatSvg } from '../src'
import { toRuntimeExtends } from './helpers/lint'

const FIXTURE_ROOT = path.resolve(import.meta.dirname, 'fixtures')

const cases = [
  {
    name: 'base',
    fixture: 'base',
    files: ['index.css', 'index.html', 'other.css'],
    extends: [base],
  },
  {
    name: 'miniprogram',
    fixture: 'miniprogram',
    files: ['index.wxss', 'index.wxml'],
    extends: [base, miniprogram],
  },
  { name: 'pxtorem', fixture: 'pxtorem', files: ['index.css'], extends: [base, pxtorem] },
  { name: 'scss', fixture: 'scss', files: ['index.scss'], extends: [base, scss] },
  {
    name: 'uniapp-scss',
    fixture: 'uniapp-scss',
    files: ['index.vue'],
    extends: [base, vueScss, uniapp],
  },
  {
    name: 'uniapp',
    fixture: 'uniapp',
    files: ['vue3.vue', 'global.vue'],
    extends: [base, vue, uniapp],
  },
  { name: 'vue-scss', fixture: 'vue-scss', files: ['index.vue'], extends: [base, vueScss] },
  { name: 'vue', fixture: 'vue', files: ['index.vue'], extends: [base, vue] },
  { name: 'wechat-svg', fixture: 'wechat-svg', files: ['index.html'], extends: [base, wechatSvg] },
] as const

describe('@tofrankie/stylelint fixture projects', () => {
  for (const testCase of cases) {
    it(`passes fixture: ${testCase.name}`, async () => {
      const cwd = path.join(FIXTURE_ROOT, testCase.fixture)
      const files = testCase.files.map(file => path.join(cwd, file))

      const result = await stylelint.lint({
        cwd,
        files,
        config: {
          extends: toRuntimeExtends(testCase.extends),
        },
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

  it('miniprogram WXML without a style attribute does not report no-empty-source', async () => {
    const cwd = path.join(FIXTURE_ROOT, 'miniprogram-without-style')
    const result = await stylelint.lint({
      cwd,
      files: [path.join(cwd, 'index.wxml')],
      config: {
        extends: toRuntimeExtends([base, miniprogram]),
      },
    })

    const noEmptySourceWarnings = result.results.flatMap(item =>
      item.warnings.filter(w => w.rule === 'no-empty-source')
    )

    expect(
      noEmptySourceWarnings,
      'no-empty-source should not apply to WXML that has no inline style to extract'
    ).toEqual([])
  })
})
