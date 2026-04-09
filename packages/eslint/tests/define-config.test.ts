import type { TypedFlatConfigItem } from '@antfu/eslint-config'
import type { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'
import { defineConfig } from '../src/index.js'

describe('@tofrankie/eslint defineConfig', () => {
  it('resolves the default config', async () => {
    const configs = await defineConfig().toConfigs()
    const names = configs.map((item: TypedFlatConfigItem) => item.name).filter(Boolean)

    expect(findConfigByName(configs, 'antfu/typescript/rules')).toBeTruthy()
    expect(names).toContain('tofrankie/jsdoc/javascript')
    expect(findConfigByName(configs, 'tofrankie/user-rules')).toBeUndefined()
  })

  it('does not enable TypeScript-only overrides when typescript is false', async () => {
    const configs = await defineConfig({ typescript: false }).toConfigs()

    expect(findConfigByName(configs, 'antfu/typescript/rules')).toBeUndefined()
  })

  it('keeps TypeScript overrides when typescript is explicitly true', async () => {
    const configs = await defineConfig({ typescript: true }).toConfigs()
    const typescriptConfig = findConfigByName(configs, 'antfu/typescript/rules')

    expect(typescriptConfig?.rules?.['unused-imports/no-unused-vars']).toBe('off')
    expect(typescriptConfig?.rules?.['ts/no-unused-vars']).toBeTruthy()
  })

  it('merges integration overrides with built-in custom rules', async () => {
    const configs = await defineConfig({
      javascript: {
        overrides: {
          'no-alert': 'error',
        },
      },
    }).toConfigs()
    const javascriptRules = findConfigByName(configs, 'antfu/javascript/rules')

    expect(javascriptRules?.rules?.['no-alert']).toBe('error')
    expect(javascriptRules?.rules?.['no-console']).toBe('off')
    expect(javascriptRules?.rules?.['no-debugger']).toBe('warn')
  })

  it('routes first-argument rules through antfu fused config', async () => {
    const configs = await defineConfig({
      javascript: {
        overrides: {
          'no-console': 'warn',
        },
      },
      rules: {
        'no-console': 'error',
        'style/operator-linebreak': ['error', 'after'],
      },
    }).toConfigs()

    expect(findConfigByName(configs, 'tofrankie/user-rules')).toBeUndefined()
    expect(findConfigByName(configs, 'antfu/javascript/rules')?.rules?.['no-console']).toBe('warn')
    expect(findFusedConfig(configs)?.rules?.['no-console']).toBe('error')
    expect(findFusedConfig(configs)?.rules?.['style/operator-linebreak']).toEqual([
      'error',
      'after',
    ])
  })

  it('allows later flat configs to override first-argument rules', async () => {
    const configs = await defineConfig(
      {
        rules: {
          'no-console': 'error',
        },
      },
      {
        name: 'user/final-rules',
        rules: {
          'no-console': 'warn',
        },
      }
    ).toConfigs()

    expect(findConfigByName(configs, 'user/final-rules')?.rules?.['no-console']).toBe('warn')
    expect(findFusedConfig(configs)?.rules?.['no-console']).toBe('error')
    expect(findRuleEntry(configs, 'no-console')).toBe('warn')
  })

  it('keeps package e18e defaults when user enables e18e with boolean true', async () => {
    const configs = await defineConfig({ e18e: true }).toConfigs()

    expect(
      findConfigByName(configs, 'antfu/e18e/rules')?.rules?.['e18e/prefer-array-to-sorted']
    ).toBe('off')
  })

  it('lets user e18e overrides win over package defaults', async () => {
    const configs = await defineConfig({
      e18e: {
        overrides: {
          'e18e/prefer-array-to-sorted': 'warn',
        },
      },
    }).toConfigs()

    expect(
      findConfigByName(configs, 'antfu/e18e/rules')?.rules?.['e18e/prefer-array-to-sorted']
    ).toBe('warn')
  })

  it('does not inject package e18e defaults when e18e is false', async () => {
    const configs = await defineConfig({ e18e: false }).toConfigs()

    expect(findConfigByName(configs, 'antfu/e18e/rules')).toBeUndefined()
  })

  it('does not inject package unicorn defaults when unicorn is false', async () => {
    const configs = await defineConfig({ unicorn: false }).toConfigs()

    expect(findConfigByName(configs, 'antfu/unicorn/rules')).toBeUndefined()
  })

  it('applies node defaults on antfu node config items', async () => {
    const configs = await defineConfig().toConfigs()

    expect(
      findConfigByName(configs, 'antfu/node/rules')?.rules?.['node/prefer-global/process']
    ).toBe('off')
  })

  it('applies eslint-comments defaults on antfu comments config items', async () => {
    const configs = await defineConfig().toConfigs()

    expect(
      findConfigByName(configs, 'antfu/eslint-comments/rules')?.rules?.[
        'eslint-comments/no-unlimited-disable'
      ]
    ).toBe('off')
  })

  it('keeps first-argument rules higher than node package presets', async () => {
    const configs = await defineConfig({
      rules: {
        'node/prefer-global/process': 'error',
      },
    }).toConfigs()

    expect(
      findConfigByName(configs, 'antfu/node/rules')?.rules?.['node/prefer-global/process']
    ).toBe('off')
    expect(findRuleEntry(configs, 'node/prefer-global/process')).toBe('error')
  })

  it('turns off pnpm/yaml-enforce-settings when antfu pnpm integration is active', async () => {
    const configs = await defineConfig().toConfigs()
    const pnpmYaml = findConfigByName(configs, 'antfu/pnpm/pnpm-workspace-yaml')

    if (!pnpmYaml) {
      return
    }

    expect(pnpmYaml.rules?.['pnpm/yaml-enforce-settings']).toBe('off')
  })

  it('omits pnpm integration when pnpm is false', async () => {
    const configs = await defineConfig({ pnpm: false }).toConfigs()

    expect(findConfigByName(configs, 'antfu/pnpm/pnpm-workspace-yaml')).toBeUndefined()
  })

  it('keeps formatter integrations disabled by default', async () => {
    const configs = await defineConfig().toConfigs()

    expect(findConfigByName(configs, 'antfu/formatter/html')).toBeUndefined()
    expect(findConfigByName(configs, 'antfu/formatter/css')).toBeUndefined()
    expect(findRuleEntry(configs, 'format/prettier')).toBeUndefined()
  })

  it('keeps the built-in prettier base when formatters is true', async () => {
    const configs = await defineConfig({ formatters: true }).toConfigs()
    const formatterRule = findConfigByName(configs, 'antfu/formatter/html')?.rules?.[
      'format/prettier'
    ]

    expect(configs.map((item: TypedFlatConfigItem) => item.name)).toEqual(
      expect.arrayContaining([
        'antfu/formatter/css',
        'antfu/formatter/html',
        'antfu/formatter/markdown',
        'antfu/formatter/graphql',
      ])
    )
    expect(findConfigByName(configs, 'antfu/formatter/xml')).toBeUndefined()
    expect(findConfigByName(configs, 'antfu/formatter/astro')).toBeUndefined()
    expect(findConfigByName(configs, 'antfu/formatter/svg')).toBeUndefined()

    expect(formatterRule).toEqual([
      'error',
      expect.objectContaining({
        printWidth: 120,
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'es5',
        htmlWhitespaceSensitivity: 'css',
        parser: 'html',
      }),
    ])
  })

  it('merges formatter prettierOptions with the built-in base config', async () => {
    const configs = await defineConfig({
      formatters: {
        html: true,
        prettierOptions: {
          printWidth: 80,
        },
      },
    }).toConfigs()
    const formatterRule = findConfigByName(configs, 'antfu/formatter/html')?.rules?.[
      'format/prettier'
    ]

    expect(formatterRule).toEqual([
      'error',
      expect.objectContaining({
        printWidth: 80,
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        trailingComma: 'es5',
        htmlWhitespaceSensitivity: 'css',
        parser: 'html',
      }),
    ])
  })

  it('keeps jsdoc overrides without redefining the jsdoc plugin', async () => {
    const configs = await defineConfig({ jsdoc: true }).toConfigs()
    const names = configs.map((item: TypedFlatConfigItem) => item.name).filter(Boolean)

    expect(names).toContain('antfu/jsdoc/setup')
    expect(names).toContain('tofrankie/jsdoc/javascript')
    expect(names).toContain('tofrankie/jsdoc/typescript')
  })

  it('keeps first-argument rules higher than jsdoc package presets', async () => {
    const configs = await defineConfig({
      jsdoc: true,
      rules: {
        'jsdoc/require-param-type': 'error',
      },
    }).toConfigs()

    expect(findRuleEntry(configs, 'jsdoc/require-param-type')).toBe('error')
  })

  it('only enables react type-aware rules when tsconfigPath is provided', async () => {
    const reactConfigs = await defineConfig({ react: true }).toConfigs()
    const typedReactConfigs = await defineConfig({
      react: true,
      typescript: { tsconfigPath: 'tsconfig.json' },
    }).toConfigs()

    expect(reactConfigs.map((item: TypedFlatConfigItem) => item.name)).not.toContain(
      'antfu/react/type-aware-rules'
    )
    expect(typedReactConfigs.map((item: TypedFlatConfigItem) => item.name)).toContain(
      'antfu/react/type-aware-rules'
    )
  })

  it('keeps default react overrides when react is explicitly true', async () => {
    const configs = await defineConfig({ react: true }).toConfigs()

    expect(findRuleEntry(configs, 'react-hooks-extra/no-direct-set-state-in-use-effect')).toBe(
      'off'
    )
  })

  it('treats object react options as enabled', async () => {
    const configs = await defineConfig({
      react: {
        overrides: {
          'react/no-danger': 'off',
        },
      },
    }).toConfigs()

    expect(findRuleEntry(configs, 'react-hooks-extra/no-direct-set-state-in-use-effect')).toBe(
      'off'
    )
  })

  it('keeps antfu react plugins as concrete objects', async () => {
    const configs = await defineConfig({ react: true }).toConfigs()
    const reactSetup = configs.find(
      (item: TypedFlatConfigItem) => item.name === 'antfu/react/setup'
    )
    const pluginTypes = Object.fromEntries(
      Object.entries(reactSetup?.plugins ?? {}).map(([name, plugin]) => [name, typeof plugin])
    )

    expect(pluginTypes).toEqual({
      react: 'object',
      'react-dom': 'object',
      'react-naming-convention': 'object',
      'react-refresh': 'object',
      'react-rsc': 'object',
      'react-web-api': 'object',
    })
  })
})

function findRuleEntry(
  configs: TypedFlatConfigItem[],
  ruleName: string
): Linter.RuleEntry | undefined {
  let matched: Linter.RuleEntry | undefined

  for (const config of configs) {
    if (config.rules && ruleName in config.rules) {
      matched = config.rules[ruleName]
    }
  }

  return matched
}

function findConfigByName(
  configs: TypedFlatConfigItem[],
  name: string
): TypedFlatConfigItem | undefined {
  return configs.find(config => config.name === name)
}

function findFusedConfig(configs: TypedFlatConfigItem[]): TypedFlatConfigItem | undefined {
  return configs.findLast(config => !config.name && !!config.rules)
}
