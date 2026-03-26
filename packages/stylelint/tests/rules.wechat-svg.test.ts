import type { RuleAllowCase } from './helpers/lint'
import { describe, it } from 'vitest'
import { expectRuleNotTriggered } from './helpers/lint'

const WECHAT_SVG_EXTENDS = ['@tofrankie/stylelint', '@tofrankie/stylelint/wechat-svg']

interface WechatSvgRuleGroup {
  title: string
  rule: string
  codeFilename: string
  cases: RuleAllowCase[]
}

const groups: WechatSvgRuleGroup[] = [
  {
    title: 'keeps visiblePainted keyword valid despite lower-case rule',
    rule: 'value-keyword-case',
    codeFilename: 'a.svg',
    cases: [{ input: '<svg><g style="pointer-events: visiblePainted;" /></svg>' }],
  },
]

describe('@tofrankie/stylelint wechat-svg rules', () => {
  for (const group of groups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await expectRuleNotTriggered({
            rule: group.rule,
            codeFilename: group.codeFilename,
            extendsConfigs: WECHAT_SVG_EXTENDS,
            testCase,
          })
        })
      }
    })
  }
})
