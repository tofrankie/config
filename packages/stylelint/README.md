# @tofrankie/stylelint

![npm version](https://img.shields.io/npm/v/@tofrankie/stylelint) ![node version](https://img.shields.io/node/v/@tofrankie/stylelint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/stylelint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/stylelint)

Shared [Stylelint](https://stylelint.io/user-guide/get-started) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

Install dependencies:

```bash
$ pnpm add stylelint @tofrankie/stylelint -D
```

ESM (`stylelint.config.mjs`):

```js
export default {
  extends: ['@tofrankie/stylelint'],
}
```

CJS (`stylelint.config.cjs`):

```js
module.exports = {
  extends: ['@tofrankie/stylelint'],
}
```

`@tofrankie/stylelint` exports the [base preset](./src/base.ts) by default.

## Presets

Use one or more presets in `extends`. Later entries in `extends` override earlier ones.

### Base

> Base preset with HTML support and CSS property ordering.

```js
export default {
  extends: ['@tofrankie/stylelint'],
}
```

Visual Studio Code: use [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) and merge the snippet below into `settings.json` to enable linting for `.html`:

```json
{
  "stylelint.validate": ["html"]
}
```

### SCSS

> SCSS preset.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/scss'],
}
```

### Vue

> Vue preset.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue'],
}
```

Visual Studio Code: merge the snippet below into `settings.json` to enable linting for `.vue`:

```json
{
  "stylelint.validate": ["vue"]
}
```

### Vue + SCSS

> Vue + SCSS preset.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss'],
}
```

Do not use both `vue` and `vue-scss`; `vue-scss` already includes the Vue preset.

### Miniprogram

> Miniprogram preset with WXSS and WXML support.

> WXSS parsing is powered by PostCSS, and WXML parsing is powered by [@tofrankie/postcss-wxml](https://github.com/tofrankie/postcss-wxml).

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/miniprogram'],
}
```

Visual Studio Code: merge the snippet below into `settings.json` to enable linting for `.wxss` and `.wxml`:

```json
{
  "stylelint.validate": ["wxss", "wxml"]
}
```

### uni-app

> uni-app preset.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue', '@tofrankie/stylelint/uniapp'],
}
```

With SCSS, use `vue-scss` and then `uniapp`:

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss', '@tofrankie/stylelint/uniapp'],
}
```

### pxtorem

> pxtorem addon preset for projects using [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem).

```js
export default {
  extends: ['@tofrankie/stylelint/base', '@tofrankie/stylelint/pxtorem'],
}
```

Use this addon preset when you need to allow `1Px` or `1PX` to survive conversion.

### WeChat SVG

> WeChat SVG preset.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/wechat-svg'],
}
```

## Merging `languageOptions`

When you extend multiple presets, later entries usually replace earlier `languageOptions` instead of deep-merging them, so some syntax settings can be dropped.

This package ships preset `languageOptions` for common cases, and exports `mergeLanguageOptions` plus preset objects so you can combine or override them safely.

Provided preset language options:

- [BASE_LANGUAGE_OPTIONS](./src/language-options/base.ts)
- [MINIPROGRAM_LANGUAGE_OPTIONS](./src/language-options/miniprogram.ts)

Example:

```js
import { BASE_LANGUAGE_OPTIONS, mergeLanguageOptions } from '@tofrankie/stylelint'

const languageOptions = mergeLanguageOptions(
  BASE_LANGUAGE_OPTIONS,
  // your overrides...
  {
    syntax: {
      // ...
    },
  }
)

export default {
  extends: ['@tofrankie/stylelint'],
  languageOptions,
}
```
