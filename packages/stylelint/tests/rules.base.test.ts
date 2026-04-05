import type { RuleAllowCase, RuleFixCase } from './helpers/lint'
import { describe, it } from 'vitest'
import { base } from '../src'
import { expectRuleNotTriggered, expectRuleTriggered, expectRuleTriggeredAndFixed } from './helpers/lint'

const BASE_EXTENDS = [base]

interface BaseRuleGroup {
  title: string
  rule: string
  codeFilename?: string
  cases: RuleFixCase[]
}

interface BaseAllowGroup {
  title: string
  rule: string
  codeFilename?: string
  cases: RuleAllowCase[]
}

interface BaseDenyGroup {
  title: string
  rule: string
  codeFilename?: string
  cases: RuleAllowCase[]
}

const groups: BaseRuleGroup[] = [
  {
    title: 'string-quotes enforces single quote and can auto-fix',
    rule: '@stylistic/string-quotes',
    cases: [
      {
        input: '.example { content: "x"; }',
        output: ".example { content: 'x'; }",
      },
    ],
  },
  {
    title: 'function-url-quotes enforces quoted url and can auto-fix',
    rule: 'function-url-quotes',
    cases: [
      {
        input: '.example { background-image: url(a.png); }',
        output: '.example { background-image: url("a.png"); }',
      },
      {
        input: '@import url(./other.css);',
        output: '@import url("./other.css");',
      },
    ],
  },
]

const allowGroups: BaseAllowGroup[] = [
  {
    title: 'constant syntax allows declared safe-area values',
    rule: 'declaration-property-value-no-unknown',
    cases: [
      { input: '.example { padding-top: constant(safe-area-inset-top); }' },
      { input: '.example { padding-right: constant(safe-area-inset-right); }' },
      { input: '.example { padding-bottom: constant(safe-area-inset-bottom); }' },
      { input: '.example { padding-left: constant(safe-area-inset-left); }' },
    ],
  },
  {
    title: 'order/properties-order accepts width before height',
    rule: 'order/properties-order',
    cases: [{ input: '.example { width: 100px; height: 50px; }' }],
  },
  {
    title: 'order/properties-order accepts width before height in html inline style',
    rule: 'order/properties-order',
    codeFilename: 'test.html',
    cases: [{ input: '<div style="width: 100px; height: 50px;"></div>' }],
  },
]

const denyGroups: BaseDenyGroup[] = [
  {
    title: 'constant syntax rejects unsupported values',
    rule: 'declaration-property-value-no-unknown',
    cases: [
      { input: '.example { padding-bottom: constant(safe-area-inset-middle); }' },
      { input: '.example { width: constant(safe-area-inset-bottom); }' },
    ],
  },
  {
    title: 'order/properties-order rejects height before width',
    rule: 'order/properties-order',
    cases: [{ input: '.example { height: 50px; width: 100px; }' }],
  },
  {
    title: 'order/properties-order rejects height before width in html inline style',
    rule: 'order/properties-order',
    codeFilename: 'test.html',
    cases: [{ input: '<div style="height: 50px; width: 100px;"></div>' }],
  },
]

describe('@tofrankie/stylelint base rules', () => {
  for (const group of groups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await runBaseRuleCase(group.rule, testCase, group.codeFilename)
        })
      }
    })
  }

  for (const group of allowGroups) {
    describe(group.title, () => {
      for (const [index, testCase] of group.cases.entries()) {
        it(`case #${index + 1}`, async () => {
          await expectRuleNotTriggered({
            rule: group.rule,
            codeFilename: group.codeFilename ?? 'test.css',
            extendsConfigs: BASE_EXTENDS,
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
            codeFilename: group.codeFilename ?? 'test.css',
            extendsConfigs: BASE_EXTENDS,
            testCase,
          })
        })
      }
    })
  }
})

async function runBaseRuleCase(rule: string, testCase: RuleFixCase, codeFilename?: string) {
  await expectRuleTriggeredAndFixed({
    rule,
    codeFilename: codeFilename ?? 'test.css',
    extendsConfigs: BASE_EXTENDS,
    testCase,
  })
}
