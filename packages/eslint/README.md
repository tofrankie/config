# @tofrankie/eslint

![npm version](https://img.shields.io/npm/v/@tofrankie/eslint) ![node version](https://img.shields.io/node/v/@tofrankie/eslint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/eslint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/eslint)

Shared [ESLint](https://eslint.org/) configuration built on [@antfu/eslint-config](https://github.com/antfu/eslint-config).

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

> [!NOTE]
>
> - Node.js: 22.0.0
> - ESLint: 10.0.0
> - TypeScript: 5.0.0

Install dependencies:

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

ESM (`eslint.config.mjs`):

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

CJS (`eslint.config.cjs`):

```js
const { defineConfig } = require('@tofrankie/eslint')

module.exports = defineConfig()
```

## Configuration

`defineConfig(antfuOptions?, ...flatConfigItems)` mirrors [@antfu/eslint-config usage](https://github.com/antfu/eslint-config#customization): the first argument is antfu-style options (integrations, `rules`, etc.); rest arguments are extra flat config items appended after the generated stack.

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    typescript: true,
    react: true,
  },
  {
    // additional flat config item
  }
)
```

- The first argument uses antfu-compatible options.
- User `rules` in the first argument follow antfu's fused-config semantics and stay ahead of any extra flat configs passed in the rest arguments.

> `@tofrankie/eslint` already ships the plugin dependencies behind antfu's renamed rule prefixes. In normal usage you do not need to install those ESLint plugins again in your project. Enable the corresponding antfu options as needed, such as `typescript`, `vue`, `react`, `test`, or `formatters`.

### Integration `overrides` vs global `rules`

Prefer per-integration `overrides` when a rule belongs to a specific stack (correct file globs and plugin context). Use top-level `rules` only for truly global tweaks; that layer is not scoped to integration file patterns.

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig({
  vue: {
    overrides: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
  },
})
```

```js
export default defineConfig({
  rules: { 'no-console': 'off' },
})
```

## TypeScript

Activation follows antfu: when `typescript` is left unset, support turns on if a `typescript` package is present. Set `typescript: false` for JS-only repos that still install TypeScript for tooling.

Type-aware rules need `typescript.tsconfigPath` (stricter, slower, requires a valid `tsconfig.json`). With React enabled, React type-aware rules follow the same gate.

```js
export default defineConfig({
  typescript: { tsconfigPath: 'tsconfig.json' },
})
```

## Formatters

@antfu/eslint-config can wire formatters (CSS, HTML, Markdown, GraphQL, Astro, etc.). **This preset disables those integrations by default** so ESLint does not duplicate work when you already use Prettier (and optionally Stylelint). Defaults still include a `formatters.prettierOptions` base aligned with `@tofrankie/prettier`; it applies once you turn formatters on.

Behavior:

- `formatters: false` — all formatter integrations off
- `formatters: true` — enables the same subset as antfu's boolean shortcut (`css`, `html`, `markdown`, `graphql`), merged with the built-in `prettierOptions` base
- `formatters: { ... }` — deep-merged with the preset defaults (individual flags off until you set them)

```js
export default defineConfig({
  formatters: {
    html: true,
    markdown: true,
    prettierOptions: { printWidth: 100 },
  },
})
```

<!--
## JSDoc

JSDoc stays on antfu's built-in integration; this package layers rule and settings overrides without registering the `jsdoc` plugin twice. Details: [JSDoc strategy](./docs/jsdoc-strategy.md).
-->

## WeChat miniprogram

`MINIPROGRAM_LANGUAGE_OPTIONS` exposes common miniprogram globals for an extra flat item:

```js
import { defineConfig, MINIPROGRAM_LANGUAGE_OPTIONS } from '@tofrankie/eslint'

export default defineConfig(
  { ignores: ['project.config.json', 'project.private.config.json'] },
  { languageOptions: MINIPROGRAM_LANGUAGE_OPTIONS }
)
```

## Acknowledgements

Thanks to these referenced packages:

- [`@antfu/eslint-config`](https://github.com/antfu/eslint-config)
