# @tofrankie/stylelint

![npm version](https://img.shields.io/npm/v/@tofrankie/stylelint) ![node version](https://img.shields.io/node/v/@tofrankie/stylelint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/stylelint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/stylelint)

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

Using SCSS in Vue:

> `@tofrankie/stylelint/scss` must come before `@tofrankie/stylelint/vue`.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/scss', '@tofrankie/stylelint/vue'],
}
```

### Miniprogram

- Supports `rpx` as a unit.
- Supports `page` as a selector type.

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

### Uniapp

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ['@tofrankie/stylelint', '@tofrankie/stylelint/vue', '@tofrankie/stylelint/uniapp'],
}
```

Using SCSS in Uniapp:

> `@tofrankie/stylelint/scss` must come before `@tofrankie/stylelint/uniapp`.

```js
/** @type {import('stylelint').Config} */
export default {
  extends: [
    '@tofrankie/stylelint',
    '@tofrankie/stylelint/scss',
    '@tofrankie/stylelint/vue',
    '@tofrankie/stylelint/uniapp',
  ],
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

You can combine any of the configs above. Later entries in `extends` override earlier ones.
