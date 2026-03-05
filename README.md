# @tofrankie/config

Shared configuration for ESLint, Prettier, Stylelint, and Commitlint.

## Packages

| Package                                      | Version                                                                                                                                                      | Last Update                                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@tofrankie/eslint](packages/eslint)         | <a href="https://www.npmjs.com/package/@tofrankie/eslint"><img src="https://img.shields.io/npm/v/@tofrankie/eslint?label=%20" alt="NPM Version"></a>         | <a href="https://www.npmjs.com/package/@tofrankie/eslint"><img src="https://img.shields.io/npm/last-update/@tofrankie/eslint?label=%20" alt="NPM Last Update"></a>         |
| [@tofrankie/prettier](packages/prettier)     | <a href="https://www.npmjs.com/package/@tofrankie/prettier"><img src="https://img.shields.io/npm/v/@tofrankie/prettier?label=%20" alt="NPM Version"></a>     | <a href="https://www.npmjs.com/package/@tofrankie/prettier"><img src="https://img.shields.io/npm/last-update/@tofrankie/prettier?label=%20" alt="NPM Last Update"></a>     |
| [@tofrankie/stylelint](packages/stylelint)   | <a href="https://www.npmjs.com/package/@tofrankie/stylelint"><img src="https://img.shields.io/npm/v/@tofrankie/stylelint?label=%20" alt="NPM Version"></a>   | <a href="https://www.npmjs.com/package/@tofrankie/stylelint"><img src="https://img.shields.io/npm/last-update/@tofrankie/stylelint?label=%20" alt="NPM Last Update"></a>   |
| [@tofrankie/commitlint](packages/commitlint) | <a href="https://www.npmjs.com/package/@tofrankie/commitlint"><img src="https://img.shields.io/npm/v/@tofrankie/commitlint?label=%20" alt="NPM Version"></a> | <a href="https://www.npmjs.com/package/@tofrankie/commitlint"><img src="https://img.shields.io/npm/last-update/@tofrankie/commitlint?label=%20" alt="NPM Last Update"></a> |

> [!IMPORTANT]
> Rule presets in **@tofrankie/eslint** and **@tofrankie/stylelint** are not yet stable and may change.

## Usage

### ESLint

[More](packages/eslint/README.md)

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

Create an `eslint.config.js` in your project root:

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

### Prettier

[More](packages/prettier/README.md)

```bash
$ pnpm add prettier @tofrankie/prettier -D
```

Create a `prettier.config.js` in your project root:

```js
export default '@tofrankie/prettier'
```

### Stylelint

[More](packages/stylelint/README.md)

```bash
$ pnpm add stylelint @tofrankie/stylelint -D
```

Create a `stylelint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/stylelint'],
}
```

### Commitlint

[More](packages/commitlint/README.md)

```bash
$ pnpm add commitlint @tofrankie/commitlint -D
```

Create a `commitlint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/commitlint'],
}
```

## Others

Use [@antfu/nip](https://github.com/antfu/nip) to manage dependencies and keep [pnpm catalogs](https://antfu.me/posts/categorize-deps) in sync.
