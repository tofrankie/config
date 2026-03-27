# @tofrankie/stylelint

![npm version](https://img.shields.io/npm/v/@tofrankie/stylelint) ![node version](https://img.shields.io/node/v/@tofrankie/stylelint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/stylelint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/stylelint)

A shared [Stylelint](https://stylelint.io/user-guide/get-started) configuration.

> [!IMPORTANT]
> Rule presets are not yet stable and may change.

## Quick Start

```bash
$ pnpm add stylelint @tofrankie/stylelint -D
```

Create a `stylelint.config.js` in your project root, then extend one or more presets below.

### Standard

Standard Stylelint rules, CSS property order, and support for HTML.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint'],
}
```

Visual Studio Code: enable lint for `.html` ([stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint))

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["html"]
}
```

### SCSS

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/scss'],
}
```

### Vue

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue'],
}
```

Visual Studio Code: enable lint for `.vue` ([stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint))

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["vue"]
}
```

### Vue + SCSS

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss'],
}
```

### Native Miniprogram

- Supports `rpx` as a unit.
- Supports `page` as a selector type.
- Parses `.wxss` (PostCSS) and `.wxml` (postcss-html) for miniprogram styles.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/miniprogram'],
  overrides: [
    {
      files: ['**/*.wxss'],
      rules: {
        // wxss files can be empty
        'no-empty-source': null,
      },
    },
  ],
}
```

Visual Studio Code: enable lint for `.wxss` and `.wxml` ([stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint))

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["wxss", "wxml"]
}
```

### Uniapp

Vue-based; adds miniprogram-specific rules (e.g. `rpx`, `page` selector).

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue', '@tofrankie/stylelint/uniapp'],
}
```

With SCSS, use `vue-scss` then `uniapp`:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue-scss', '@tofrankie/stylelint/uniapp'],
}
```

### Ignore min-pixel formatting

Suppresses formatting for `1Px` and `1PX` units. [More](https://github.com/cuth/postcss-pxtorem/#a-message-about-ignoring-properties)

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint/standard', '@tofrankie/stylelint/min-pixel'],
}
```

### WeChat SVG

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/wechat-svg'],
}
```

### Combining configs

Combine presets as needed; later entries in `extends` override earlier ones. Use either `vue` or `vue-scss` (not both)—`vue-scss` already includes Vue.

### LanguageOptions Merging

When multiple presets are extended, `languageOptions` from later entries usually override earlier ones instead of being deep-merged, which can cause some syntax options to be lost.

To cover specific scenarios, this package includes built-in preset `languageOptions`. For further customization, it also exports preset language options and the `mergeLanguageOptions` helper. Presets are adjusted to their corresponding file types.

Provided preset language options:

- `[STANDARD_LANGUAGE_OPTIONS](./src/language-options/standard.ts)`
- `[MINIPROGRAM_LANGUAGE_OPTIONS](./src/language-options/miniprogram.ts)`

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
