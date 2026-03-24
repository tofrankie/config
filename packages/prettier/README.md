# @tofrankie/prettier

![npm version](https://img.shields.io/npm/v/@tofrankie/prettier) ![node version](https://img.shields.io/node/v/@tofrankie/prettier) ![npm package license](https://img.shields.io/npm/l/@tofrankie/prettier) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/prettier)

A shared [Prettier](https://prettier.io/docs/configuration) configuration.

## Quick Start

```bash
$ pnpm add prettier @tofrankie/prettier -D
```

Create a `prettier.config.js` in your project root:

```js
export default '@tofrankie/prettier'
```

## Attribute Sorting

Attribute order follows [Code Guide by @mdo](https://codeguide.co/#attribute-order). To sort attributes in HTML, Vue, or Miniapp (WXML) files, use the options below:

### HTML

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

### Miniapp

```js
import baseOptions from '@tofrankie/prettier'
import miniappOptions from '@tofrankie/prettier/options/sort-miniapp'
import wxmlOptions from '@tofrankie/prettier/options/wxml'

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.wxml'],
      options: miniappOptions, // 支持属性排序
    },
    {
      files: ['*.wxml'],
      options: wxmlOptions, // 专门针对 WXML 缩进换行 self-closing 等格式化处理
    },
  ],
}
```

### WeChat SVG

For HTML files in WeChat SVG format:

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
