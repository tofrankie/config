import stylelint from 'stylelint'
import { expect } from 'vitest'

export async function lintCode(options: {
  code: string
  codeFilename: string
  extendsConfigs: string[]
  fix?: boolean
}) {
  return stylelint.lint({
    code: options.code,
    codeFilename: options.codeFilename,
    fix: options.fix ?? false,
    config: {
      extends: options.extendsConfigs,
    },
  })
}

export function warningRules(result: Awaited<ReturnType<typeof stylelint.lint>>) {
  return result.results.flatMap(item => item.warnings.map(warning => warning.rule))
}

export interface RuleFixCase {
  input: string
  output: string
}

export interface RuleAllowCase {
  input: string
}

export async function expectRuleTriggeredAndFixed(options: {
  rule: string
  codeFilename: string
  extendsConfigs: string[]
  testCase: RuleFixCase
}) {
  const lintResult = await lintCode({
    code: options.testCase.input,
    codeFilename: options.codeFilename,
    extendsConfigs: options.extendsConfigs,
  })

  expect(warningRules(lintResult)).toContain(options.rule)

  const fixedResult = await lintCode({
    code: options.testCase.input,
    codeFilename: options.codeFilename,
    extendsConfigs: options.extendsConfigs,
    fix: true,
  })

  expect(fixedResult.code).toBe(options.testCase.output)
}

export async function expectRuleNotTriggered(options: {
  rule: string
  codeFilename: string
  extendsConfigs: string[]
  testCase: RuleAllowCase
}) {
  const lintResult = await lintCode({
    code: options.testCase.input,
    codeFilename: options.codeFilename,
    extendsConfigs: options.extendsConfigs,
  })

  expect(warningRules(lintResult)).not.toContain(options.rule)
}

export async function expectRuleTriggered(options: {
  rule: string
  codeFilename: string
  extendsConfigs: string[]
  testCase: RuleAllowCase
}) {
  const lintResult = await lintCode({
    code: options.testCase.input,
    codeFilename: options.codeFilename,
    extendsConfigs: options.extendsConfigs,
  })

  expect(warningRules(lintResult)).toContain(options.rule)
}
