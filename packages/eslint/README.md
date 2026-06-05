# @tofrankie/eslint

![npm version](https://img.shields.io/npm/v/@tofrankie/eslint) ![node version](https://img.shields.io/node/v/@tofrankie/eslint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/eslint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/eslint)

Shared [ESLint](https://eslint.org/) configuration built on [@antfu/eslint-config](https://github.com/antfu/eslint-config).

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

> [!NOTE]
>
> - Node.js: 22.0.0
> - ESLint: 10.2.1
> - TypeScript: 6.0.3

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

`defineConfig(antfuOptions?, ...configs)` follows the same shape as [@antfu/eslint-config](https://github.com/antfu/eslint-config#customization).

- The first argument is for options such as `typescript`, `vue`, `react`, `formatters`, `rules`, etc.
- Extra flat config objects can be passed as the remaining arguments.

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    typescript: true,
    react: true,
  },
  {
    // extra flat config object
  }
)
```

> [!NOTE]
> In most cases, you only need to install `eslint` and `@tofrankie/eslint`.
> Unlike using `@antfu/eslint-config` directly, you usually do not need to install extra ESLint plugins yourself when enabling built-in options in this package.

If you want to override some built-in rules, you can usually do it in two ways:

- Use the corresponding option's `overrides` [Rules Overrides](https://github.com/antfu/eslint-config#rules-overrides)
- Add an extra flat config object and specify the file scope you want

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
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    typescript: true,
  },
  {
    files: ['scripts/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  }
)
```

## TypeScript

1. Enable TypeScript linting without type-aware rules

```js
export default defineConfig({
  typescript: true,
})
```

2. Enable type-aware rules with `tsconfigPath` [Type Aware Rules](https://github.com/antfu/eslint-config#type-aware-rules)

```js
export default defineConfig({
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
})
```

3. Override rules with `overrides` or `overridesTypeAware`

```js
export default defineConfig({
  typescript: {
    overrides: {
      'ts/consistent-type-definitions': ['error', 'interface'],
    },
    overridesTypeAware: {
      'ts/no-floating-promises': 'error',
    },
  },
})
```

4. Disable TypeScript linting explicitly

```js
export default defineConfig({
  typescript: false,
})
```

When `typescript` option is not set, behavior follows antfu's default detection.

## Formatters

`@antfu/eslint-config` can wire formatters (CSS, HTML, Markdown, GraphQL, Astro, etc.). **This preset disables those integrations by default** so ESLint does not duplicate work when you already use Prettier (and optionally Stylelint). Defaults still include a `formatters.prettierOptions` base aligned with [`@tofrankie/prettier`](https://github.com/tofrankie/config/tree/main/packages/prettier); it applies once you turn formatters on.

Behavior:

- `formatters: false` — all formatter integrations off
- `formatters: true` — enables the same subset as antfu's boolean shortcut (`css`, `html`, `markdown`, `graphql`), merged with the built-in `prettierOptions` base
- `formatters: { ... }` — deep-merged with the preset defaults (individual flags off until you set them)

```js
export default defineConfig({
  formatters: {
    html: true,
    markdown: true,
    prettierOptions: { printWidth: 120 },
  },
})
```

<!--
## JSDoc

JSDoc stays on antfu's built-in integration; this package layers rule and settings overrides without registering the `jsdoc` plugin twice. Details: [JSDoc strategy](./docs/jsdoc-strategy.md).
-->

## WeChat miniprogram

`MINIPROGRAM_LANGUAGE_OPTIONS` exposes common miniprogram globals for an extra flat config object:

```js
import { defineConfig, MINIPROGRAM_LANGUAGE_OPTIONS } from '@tofrankie/eslint'

export default defineConfig(
  { ignores: ['project.config.json', 'project.private.config.json'] },
  { languageOptions: MINIPROGRAM_LANGUAGE_OPTIONS }
)
```

## Raycast

If you are developing a Raycast extension, you can use `@tofrankie/eslint/raycast` to sort `package.json`.

```js
import { defineConfig } from 'eslint/config'
import raycastConfig from '@raycast/eslint-config'
import packageJsonSortConfig from '@tofrankie/eslint/raycast'

export default defineConfig([...raycastConfig, packageJsonSortConfig])
```

This config already includes `files: ['**/package.json']`, so it only applies to `package.json`.

## Acknowledgements

Thanks to these referenced packages:

- [@antfu/eslint-config](https://github.com/antfu/eslint-config)

## License

MIT License © [Frankie](https://github.com/tofrankie)
