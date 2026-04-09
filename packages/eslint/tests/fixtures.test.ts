import path from 'node:path'
import { ESLint } from 'eslint'
import { describe, expect, it } from 'vitest'
import { defineConfig } from '../src/index.js'

const FIXTURE_ROOT = path.resolve(import.meta.dirname, 'fixtures')

const cases = [
  {
    name: 'jsdoc',
    fixture: 'jsdoc',
    antfuOptions: {
      jsdoc: true,
    },
    files: ['eslint.config.mjs', 'src/index.js'],
  },
  {
    name: 'react-basic',
    fixture: 'react-basic',
    antfuOptions: {
      jsdoc: false,
      react: true,
    },
    files: ['eslint.config.mjs', 'src/App.jsx'],
  },
  {
    name: 'react-typed',
    fixture: 'react-typed',
    antfuOptions: {
      jsdoc: false,
      react: true,
      typescript: {
        tsconfigPath: 'tsconfig.json',
      },
    },
    files: ['eslint.config.mjs', 'src/App.tsx'],
  },
] as const

describe('@tofrankie/eslint fixture projects', () => {
  for (const testCase of cases) {
    it(`passes fixture: ${testCase.name}`, async () => {
      const cwd = path.join(FIXTURE_ROOT, testCase.fixture)
      const overrideConfig = await defineConfig(testCase.antfuOptions).toConfigs()
      const eslint = new ESLint({
        cwd,
        overrideConfig,
        overrideConfigFile: true,
      })

      const result = await eslint.lintFiles([...testCase.files])
      const messages = result.flatMap(item =>
        item.messages.map(message => {
          const relativeFile = path.relative(cwd, item.filePath)
          return `${relativeFile}:${message.line ?? 0}:${message.column ?? 0} [${message.ruleId}] ${message.message}`
        })
      )

      expect(messages, `fixture "${testCase.name}" lint failed:\n${messages.join('\n')}`).toEqual(
        []
      )
    })
  }
})
