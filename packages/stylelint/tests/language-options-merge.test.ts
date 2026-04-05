import stylelint from 'stylelint'
import { describe, expect, it } from 'vitest'
import { BASE_LANGUAGE_OPTIONS, mergeLanguageOptions, miniprogram, MINIPROGRAM_LANGUAGE_OPTIONS } from '../src'
import { toRuntimeExtends } from './helpers/lint'

function warningRules(result: Awaited<ReturnType<typeof stylelint.lint>>) {
  return result.results.flatMap(item => item.warnings.map(warning => warning.rule))
}

describe('@tofrankie/stylelint languageOptions merge', () => {
  it('merges base syntax types/properties with miniprogram units', () => {
    const merged = mergeLanguageOptions(BASE_LANGUAGE_OPTIONS, MINIPROGRAM_LANGUAGE_OPTIONS)

    expect(merged.syntax?.types?.['constant()']).toBeDefined()
    expect(merged.syntax?.properties?.['padding-bottom']).toContain('<constant()>')
    expect(merged.syntax?.units?.length).toEqual(expect.arrayContaining(['rpx']))
  })

  it('miniprogram preset overrides.languageOptions should include base', () => {
    const expected = mergeLanguageOptions(BASE_LANGUAGE_OPTIONS, MINIPROGRAM_LANGUAGE_OPTIONS)

    const wxssLanguageOptions = miniprogram.overrides?.[0]?.languageOptions
    const wxmlLanguageOptions = miniprogram.overrides?.[1]?.languageOptions

    expect(wxssLanguageOptions).toEqual(expected)
    expect(wxmlLanguageOptions).toEqual(expected)
  })

  it('constant(safe-area-inset-*) should be allowed in wxss when using miniprogram preset only', async () => {
    const allowResult = await stylelint.lint({
      code: '.example { padding-bottom: constant(safe-area-inset-bottom); }',
      codeFilename: 'test.wxss',
      config: {
        extends: toRuntimeExtends([miniprogram]),
        rules: {
          // Enable explicitly: miniprogram itself does not include the full base rule set.
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(allowResult)).not.toContain('declaration-property-value-no-unknown')

    const denyResult = await stylelint.lint({
      code: '.example { padding-bottom: constant(safe-area-inset-middle); }',
      codeFilename: 'test.wxss',
      config: {
        extends: toRuntimeExtends([miniprogram]),
        rules: {
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(denyResult)).toContain('declaration-property-value-no-unknown')
  })

  it('constant(safe-area-inset-*) should be allowed in wxml when using miniprogram preset only', async () => {
    const result = await stylelint.lint({
      code: '<view style="padding-bottom: constant(safe-area-inset-bottom)" />',
      codeFilename: 'test.wxml',
      config: {
        extends: toRuntimeExtends([miniprogram]),
        rules: {
          'declaration-property-value-no-unknown': true,
        },
      },
    })

    expect(warningRules(result)).not.toContain('declaration-property-value-no-unknown')
  })
})
