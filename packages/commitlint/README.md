# @tofrankie/commitlint

Based on [commitlint](https://commitlint.js.org/guides/getting-started.html).

## Quick Start

```bash
$ pnpm add commitlint @tofrankie/commitlint -D
```

Create a `commitlint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/commitlint'],
}
```

See the [rules reference](https://commitlint.js.org/reference/rules.html) for more options.

Example: custom scope enum:

```js
export default {
  extends: ['@tofrankie/commitlint'],
  rules: {
    'scope-enum': [2, 'always', ['foo', 'bar']],
  },
}
```
