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

Create a `prettier.config.js` in your project root:

```js
export default '@tofrankie/prettier'
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

## Attribute order

Sorting is handled by [`prettier-plugin-organize-attributes`](https://www.npmjs.com/package/prettier-plugin-organize-attributes).

Use overrides for HTML, Vue, or WeChat Miniprogram (WXML) files:

### HTML

> Attribute order follows the [Code Guide by @mdo](https://codeguide.co/#attribute-order). [Details](./src/options/sort-html.ts)

```js
import baseOptions from '@tofrankie/prettier'
import htmlOptions from '@tofrankie/prettier/options/sort-html'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.html'],
      options: htmlOptions,
    },
  ],
}
```

### Vue

> Attribute order follows the [Vue.js Style Guide](https://vuejs.org/style-guide/rules-recommended.html#element-attribute-order). [Details](./src/options/sort-vue.ts)

```js
import baseOptions from '@tofrankie/prettier'
import vueOptions from '@tofrankie/prettier/options/sort-vue'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.vue'],
      options: vueOptions,
    },
  ],
}
```

### Native Miniprogram

> Attribute order is customized (inspired by Vue.js). [Details](./src/options/sort-miniprogram.ts)

> `.wxml` parsing uses [@tofrankie/prettier-plugin-wxml](https://github.com/tofrankie/prettier-plugin-wxml) internally.

```js
import baseOptions from '@tofrankie/prettier'
import miniprogramOptions from '@tofrankie/prettier/options/sort-miniprogram'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.wxml'],
      options: miniprogramOptions, // Formatting and organized attributes
    },
  ],
}
```

### WeChat SVG

> Attribute order is customized. [Details](./src/options/sort-wechat-svg.ts)

```js
import baseOptions from '@tofrankie/prettier'
import wechatSvgOptions from '@tofrankie/prettier/options/sort-wechat-svg'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['path/to/your/wechat-svg/*.html'], // adjust path as needed
      options: wechatSvgOptions,
    },
  ],
}
```

## Acknowledgements

Thanks to these referenced packages:

- `prettier-plugin-organize-attributes`
- `@tofrankie/prettier-plugin-wxml`
