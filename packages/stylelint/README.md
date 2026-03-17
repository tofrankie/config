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

<details>
<summary>Visual Studio Code: enable lint for <code>.html</code> (<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">stylelint.vscode-stylelint</a>)</summary>

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["html"]
}
```

</details>

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

<details>
<summary>Visual Studio Code: enable lint for <code>.vue</code> (<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">stylelint.vscode-stylelint</a>)</summary>

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["vue"]
}
```

</details>

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
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/miniapp'],
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

<details>
<summary>Visual Studio Code: enable lint for <code>.wxss</code> and <code>.wxml</code> (<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint">stylelint.vscode-stylelint</a>)</summary>

Add to your `settings.json` (merge into existing `stylelint.validate` if present):

```json
{
  "stylelint.validate": ["wxss", "wxml"]
}
```

</details>

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
