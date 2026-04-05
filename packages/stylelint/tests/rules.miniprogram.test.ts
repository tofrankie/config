import type { RuleAllowCase } from './helpers/lint'
import { describe, it } from 'vitest'
import { base, miniprogram } from '../src'
import { expectRuleNotTriggered, expectRuleTriggered } from './helpers/lint'

const MINIPROGRAM_EXTENDS = [base, miniprogram]

interface MiniprogramRuleGroup {
  title: string
  rule: string
  codeFilename: string
  cases: RuleAllowCase[]
}

interface MiniprogramDenyGroup {
  title: string
  rule: string
  codeFilename: string
  cases: RuleAllowCase[]
}

const groups: MiniprogramRuleGroup[] = [
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

const denyGroups: MiniprogramDenyGroup[] = [
  {
    title: 'declaration-property-value-no-unknown rejects non-miniprogram unit',
    rule: 'declaration-property-value-no-unknown',
    codeFilename: 'test.wxss',
    cases: [{ input: 'page { width: 20apx; }' }],
  },
]

describe('@tofrankie/stylelint miniprogram rules', () => {
  for (const group of groups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await expectRuleNotTriggered({
            rule: group.rule,
            codeFilename: group.codeFilename,
            extendsConfigs: MINIPROGRAM_EXTENDS,
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
            extendsConfigs: MINIPROGRAM_EXTENDS,
            testCase,
          })
        })
      }
    })
  }
})
