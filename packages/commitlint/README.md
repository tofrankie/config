# @tofrankie/commitlint

![npm version](https://img.shields.io/npm/v/@tofrankie/commitlint) ![node version](https://img.shields.io/node/v/@tofrankie/commitlint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/commitlint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/commitlint)

A shared [commitlint](https://commitlint.js.org/guides/getting-started.html) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

Install dependencies:

```bash
$ pnpm add commitlint @tofrankie/commitlint -D
```

Create a `commitlint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/commitlint'],
}
```

See the [Commitlint rules reference](https://commitlint.js.org/reference/rules.html) for all rule options.

**Example:** custom `scope-enum`:

```js
export default {
  extends: ['@tofrankie/commitlint'],
  rules: {
    'scope-enum': [2, 'always', ['foo', 'bar']],
  },
}
```
