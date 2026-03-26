import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'

import {
  mergeLanguageOptions,
  MINIAPP_LANGUAGE_OPTIONS,
  miniappConfig,
  STANDARD_LANGUAGE_OPTIONS,
} from '../src'

function warningRules(result: Awaited<ReturnType<typeof stylelint.lint>>) {
  return result.results.flatMap(item => item.warnings.map(warning => warning.rule))
}

describe('@tofrankie/stylelint languageOptions merge', () => {
  it('merges standard syntax types/properties with miniapp units', () => {
    const merged = mergeLanguageOptions(STANDARD_LANGUAGE_OPTIONS, MINIAPP_LANGUAGE_OPTIONS)

    expect(merged.syntax?.types?.['constant()']).toBeDefined()
    expect(merged.syntax?.properties?.['padding-bottom']).toContain('<constant()>')
    expect(merged.syntax?.units?.length).toEqual(expect.arrayContaining(['rpx']))
  })

  it('miniapp preset overrides.languageOptions should include standard', () => {
    const expected = mergeLanguageOptions(STANDARD_LANGUAGE_OPTIONS, MINIAPP_LANGUAGE_OPTIONS)

    const wxssLanguageOptions = miniappConfig.overrides?.[0]?.languageOptions
    const wxmlLanguageOptions = miniappConfig.overrides?.[1]?.languageOptions

    expect(wxssLanguageOptions).toEqual(expected)
    expect(wxmlLanguageOptions).toEqual(expected)
  })

  it('constant(safe-area-inset-*) should be allowed in wxss when using miniapp preset only', async () => {
    const allowResult = await stylelint.lint({
      code: '.example { padding-bottom: constant(safe-area-inset-bottom); }',
      codeFilename: 'test.wxss',
      config: {
        extends: ['@tofrankie/stylelint/miniapp'],
        rules: {
          // Enable explicitly: miniapp preset itself doesn't include full standard rules.
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(allowResult)).not.toContain('declaration-property-value-no-unknown')

    const denyResult = await stylelint.lint({
      code: '.example { padding-bottom: constant(safe-area-inset-middle); }',
      codeFilename: 'test.wxss',
      config: {
        extends: ['@tofrankie/stylelint/miniapp'],
        rules: {
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(denyResult)).toContain('declaration-property-value-no-unknown')
  })

  it('constant(safe-area-inset-*) should be allowed in wxml when using miniapp preset only', async () => {
    const result = await stylelint.lint({
      code: '<view style="padding-bottom: constant(safe-area-inset-bottom)" />',
      codeFilename: 'test.wxml',
      config: {
        extends: ['@tofrankie/stylelint/miniapp'],
        rules: {
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(result)).not.toContain('declaration-property-value-no-unknown')
  })
})
