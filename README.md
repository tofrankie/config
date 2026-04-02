# @tofrankie/config

Shared configuration for ESLint, Prettier, Stylelint, Commitlint, and TypeScript.

## Packages

| Package                                      | Version                                                                                                                                                      | Last Update                                                                                                                                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@tofrankie/eslint](packages/eslint)         | <a href="https://www.npmjs.com/package/@tofrankie/eslint"><img src="https://img.shields.io/npm/v/@tofrankie/eslint?label=%20" alt="NPM Version"></a>         | <a href="https://www.npmjs.com/package/@tofrankie/eslint"><img src="https://img.shields.io/npm/last-update/@tofrankie/eslint?label=%20" alt="NPM Last Update"></a>         |
| [@tofrankie/prettier](packages/prettier)     | <a href="https://www.npmjs.com/package/@tofrankie/prettier"><img src="https://img.shields.io/npm/v/@tofrankie/prettier?label=%20" alt="NPM Version"></a>     | <a href="https://www.npmjs.com/package/@tofrankie/prettier"><img src="https://img.shields.io/npm/last-update/@tofrankie/prettier?label=%20" alt="NPM Last Update"></a>     |
| [@tofrankie/stylelint](packages/stylelint)   | <a href="https://www.npmjs.com/package/@tofrankie/stylelint"><img src="https://img.shields.io/npm/v/@tofrankie/stylelint?label=%20" alt="NPM Version"></a>   | <a href="https://www.npmjs.com/package/@tofrankie/stylelint"><img src="https://img.shields.io/npm/last-update/@tofrankie/stylelint?label=%20" alt="NPM Last Update"></a>   |
| [@tofrankie/commitlint](packages/commitlint) | <a href="https://www.npmjs.com/package/@tofrankie/commitlint"><img src="https://img.shields.io/npm/v/@tofrankie/commitlint?label=%20" alt="NPM Version"></a> | <a href="https://www.npmjs.com/package/@tofrankie/commitlint"><img src="https://img.shields.io/npm/last-update/@tofrankie/commitlint?label=%20" alt="NPM Last Update"></a> |
| [@tofrankie/tsconfig](packages/tsconfig)     | <a href="https://www.npmjs.com/package/@tofrankie/tsconfig"><img src="https://img.shields.io/npm/v/@tofrankie/tsconfig?label=%20" alt="NPM Version"></a>     | <a href="https://www.npmjs.com/package/@tofrankie/tsconfig"><img src="https://img.shields.io/npm/last-update/@tofrankie/tsconfig?label=%20" alt="NPM Last Update"></a>     |

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read each package's **CHANGELOG** before upgrading.

## Usage

### ESLint

[Documentation](packages/eslint/README.md)

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

Create an `eslint.config.js` in your project root:

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

### Prettier

[Documentation](packages/prettier/README.md)

```bash
$ pnpm add prettier @tofrankie/prettier -D
```

Create a `prettier.config.js` in your project root:

```js
export default '@tofrankie/prettier'
```

### Stylelint

[Documentation](packages/stylelint/README.md)

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

[Documentation](packages/commitlint/README.md)

```bash
$ pnpm add commitlint @tofrankie/commitlint -D
```

Create a `commitlint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/commitlint'],
}
```

### TypeScript

[Documentation](packages/tsconfig/README.md)

```bash
$ pnpm add typescript @tofrankie/tsconfig -D
```

Create a `tsconfig.json` in your project root:

```json
{
  "extends": "@tofrankie/tsconfig/react.vite.json"
}
```

## See also

Use [@antfu/nip](https://github.com/antfu/nip) to manage dependencies and keep [pnpm catalogs](https://antfu.me/posts/categorize-deps) in sync.
