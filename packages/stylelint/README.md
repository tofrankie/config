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

Create a `stylelint.config.js` in your project root and extend one or more of the presets below.

### Standard

Standard Stylelint rules, CSS property order, and support for HTML.

```js
export default {
  extends: ['@tofrankie/stylelint'],
}
```

Visual Studio Code: use [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) and merge the snippet below into `settings.json` to enable lint for `.html`:

```json
{
  "stylelint.validate": ["html"]
}
```

### SCSS

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/scss'],
}
```

### Vue

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue'],
}
```

Visual Studio Code: merge the snippet below into `settings.json` to enable lint for `.vue`:

```json
{
  "stylelint.validate": ["vue"]
}
```

### Vue + SCSS

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss'],
}
```

### Native Miniprogram

- Supports `rpx` and miniprogram-specific tag selectors.
- Parses `.wxss` with PostCSS and `.wxml` with [@tofrankie/postcss-wxml](https://github.com/tofrankie/postcss-wxml).

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/miniprogram'],
}
```

Visual Studio Code: merge the snippet below into `settings.json` to enable lint for `.wxss` and `.wxml`:

```json
{
  "stylelint.validate": ["wxss", "wxml"]
}
```

### uni-app

- Vue-based.
- Supports `rpx` and miniprogram-specific tag selectors.

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue', '@tofrankie/stylelint/uniapp'],
}
```

With SCSS, use `vue-scss` then `uniapp`:

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss', '@tofrankie/stylelint/uniapp'],
}
```

### Ignore min-pixel (1Px / 1PX)

When you use [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem/), you may need `1Px` or `1PX` to survive conversion. These rules relax linting for those spellings. [More](https://github.com/cuth/postcss-pxtorem/#a-message-about-ignoring-properties)

```js
export default {
  extends: ['@tofrankie/stylelint/standard', '@tofrankie/stylelint/min-pixel'],
}
```

### WeChat SVG

```js
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/wechat-svg'],
}
```

## Combining configs

Combine presets as needed; later entries in `extends` override earlier ones. Do not use both `vue` and `vue-scss`; `vue-scss` already includes the Vue preset.

## Merging `languageOptions`

When you extend multiple presets, later entries usually **replace** earlier `languageOptions` instead of deep-merging them, so some syntax settings can be dropped.

This package ships preset `languageOptions` for common cases, and exports `mergeLanguageOptions` plus preset objects so you can combine or override them safely.

Provided preset language options:

- [STANDARD_LANGUAGE_OPTIONS](./src/language-options/standard.ts)
- [MINIPROGRAM_LANGUAGE_OPTIONS](./src/language-options/miniprogram.ts)

Example:

```js
import { mergeLanguageOptions, STANDARD_LANGUAGE_OPTIONS } from '@tofrankie/stylelint'

const languageOptions = mergeLanguageOptions(
  STANDARD_LANGUAGE_OPTIONS,
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
