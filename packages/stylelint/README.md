# @tofrankie/stylelint

A shared [Stylelint](https://stylelint.io/user-guide/get-started) configuration.

> [!IMPORTANT]
> Rule presets are not yet stable and may change.

## Quick Start

```bash
$ pnpm add stylelint @tofrankie/stylelint -D
```

Create a `stylelint.config.js` in your project root:

### Default (standard + recess order)

Uses `stylelint-config-standard` and `stylelint-config-recess-order`.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint'],
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

### Miniprogram

- Supports `rpx` as a unit.
- Supports `page` as a selector type.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/miniapp'],
}
```

### Ignore min-pixel formatting

Suppresses formatting for `1Px` and `1PX` units. [Details](https://github.com/cuth/postcss-pxtorem/#a-message-about-ignoring-properties)

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

You can combine any of the configs above. Later entries in `extends` override earlier ones.
