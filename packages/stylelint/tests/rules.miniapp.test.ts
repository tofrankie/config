import type { RuleAllowCase } from './helpers/lint'
import { describe, it } from 'vitest'
import { expectRuleNotTriggered, expectRuleTriggered } from './helpers/lint'

const MINIAPP_EXTENDS = ['@tofrankie/stylelint', '@tofrankie/stylelint/miniapp']

interface MiniappRuleGroup {
  title: string
  rule: string
  codeFilename: string
  cases: RuleAllowCase[]
}

interface MiniappDenyGroup {
  title: string
  rule: string
  codeFilename: string
  cases: RuleAllowCase[]
}

const groups: MiniappRuleGroup[] = [
  {
    title: 'selector-type-no-unknown allows page selector',
    rule: 'selector-type-no-unknown',
    codeFilename: 'test.wxss',
    cases: [{ input: 'page { width: 20rpx; }' }],
  },
  {
    title: 'declaration-property-value-no-unknown allows rpx unit',
    rule: 'declaration-property-value-no-unknown',
    codeFilename: 'test.wxss',
    cases: [{ input: '.example { width: 20rpx; }' }],
  },
]

const denyGroups: MiniappDenyGroup[] = [
  {
    title: 'declaration-property-value-no-unknown rejects non-miniapp unit',
    rule: 'declaration-property-value-no-unknown',
    codeFilename: 'test.wxss',
    cases: [{ input: 'page { width: 20apx; }' }],
  },
]

describe('@tofrankie/stylelint miniapp rules', () => {
  for (const group of groups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await expectRuleNotTriggered({
            rule: group.rule,
            codeFilename: group.codeFilename,
            extendsConfigs: MINIAPP_EXTENDS,
            testCase,
          })
        })
      }
    })
  }

  for (const group of denyGroups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await expectRuleTriggered({
            rule: group.rule,
            codeFilename: group.codeFilename,
            extendsConfigs: MINIAPP_EXTENDS,
            testCase,
          })
        })
      }
    })
  }
})
