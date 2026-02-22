# @tofrankie/eslint

A shared ESLint configuration based on [@antfu/eslint-config](https://github.com/antfu/eslint-config), with preset rules tailored to personal preferences.

> [!IMPORTANT]
> Rule presets are not yet stable and may change.

## Quick Start

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

Create an `eslint.config.js` in your project root:

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

## Configuration Examples

### Miniapp

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
