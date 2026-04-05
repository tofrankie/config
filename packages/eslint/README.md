# @tofrankie/eslint

![npm version](https://img.shields.io/npm/v/@tofrankie/eslint) ![node version](https://img.shields.io/node/v/@tofrankie/eslint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/eslint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/eslint)

Shared [ESLint](https://eslint.org/) configuration built on [@antfu/eslint-config](https://github.com/antfu/eslint-config).

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

Install dependencies:

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

Create an `eslint.config.mjs` in your project root:

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

**Customization:** [antfu/eslint-config](https://github.com/antfu/eslint-config#customization)

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    // antfu options...
    ignores: ['node_modules', 'dist'],
    typescript: true,
    react: true,
    rules: {
      // user's custom rules...
      'no-console': 'off',
    },
  },
  {
    // user's eslint flat configs...
  }
)
```

## Examples

### Native Miniprogram

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig(
  {
    ignores: ['project.config.json', 'project.private.config.json'],
    // other antfu options...
  },
  {
    languageOptions: {
      globals: {
        wx: true,
        App: true,
        getApp: true,
        getCurrentPages: true,
        Page: true,
        Component: true,
        Behavior: true,
        requireMiniProgram: true,
        requirePlugin: true,
      },
    },
  }
)
```
