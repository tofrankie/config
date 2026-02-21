# @tofrankie/prettier

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

To sort attributes in HTML, Vue, or Miniapp (WXML) files, use the options below:

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

export default {
  ...baseOptions,
  overrides: [
    {
      files: ['*.wxml'],
      options: miniappOptions,
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
