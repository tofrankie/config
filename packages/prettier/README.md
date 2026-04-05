# @tofrankie/prettier

![npm version](https://img.shields.io/npm/v/@tofrankie/prettier) ![node version](https://img.shields.io/node/v/@tofrankie/prettier) ![npm package license](https://img.shields.io/npm/l/@tofrankie/prettier) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/prettier)

Shared [Prettier](https://prettier.io/docs/configuration) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

Install dependencies:

```bash
$ pnpm add prettier @tofrankie/prettier -D
```

ESM (`prettier.config.mjs`):

```js
export default '@tofrankie/prettier'
```

CJS (`prettier.config.cjs`):

```js
module.exports = require('@tofrankie/prettier').default
```

Base options:

```json
{
  "printWidth": 120,
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "htmlWhitespaceSensitivity": "css"
}
```

## Attribute Order

Attribute ordering is handled by [`prettier-plugin-organize-attributes`](https://www.npmjs.com/package/prettier-plugin-organize-attributes).

Use overrides for HTML, Vue, WXML, or WeChat SVG files:

### HTML

> HTML preset with attribute ordering. [Details](./src/html.ts)

```js
import { base, html } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['*.html'],
      options: html,
    },
  ],
}
```

### Vue

> Vue preset with attribute ordering. [Details](./src/vue.ts)

```js
import { base, vue } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['*.vue'],
      options: vue,
    },
  ],
}
```

### WXML

> WXML preset with attribute ordering. [Details](./src/wxml.ts)

> WXML parsing is powered by [@tofrankie/prettier-plugin-wxml](https://github.com/tofrankie/prettier-plugin-wxml).

```js
import { base, wxml } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['*.wxml'],
      options: wxml,
    },
  ],
}
```

If you don't need attribute ordering, import `wxml-base`:

```js
import { base, wxmlBase } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['*.wxml'],
      options: wxmlBase,
    },
  ],
}
```

### WeChat SVG

> WeChat SVG preset with attribute ordering. [Details](./src/wechat-svg.ts)

```js
import { base, wechatSvg } from '@tofrankie/prettier'

export default {
  ...base,
  overrides: [
    {
      files: ['path/to/your/wechat-svg/*.html'],
      options: wechatSvg,
    },
  ],
}
```

## Acknowledgements

Thanks to these referenced packages:

- `prettier-plugin-organize-attributes`
- `@tofrankie/prettier-plugin-wxml`
