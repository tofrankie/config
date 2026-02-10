# @tofrankie/config

Shared configuration for @tofrankie projects.

> [!IMPORTANT]
> Rule presets in **@tofrankie/eslint** and **@tofrankie/stylelint** are not yet stable and may change.

## Packages

- [@tofrankie/commitlint](packages/commitlint)
- [@tofrankie/eslint](packages/eslint)
- [@tofrankie/prettier](packages/prettier)
- [@tofrankie/stylelint](packages/stylelint)

## Usage

### ESLint

```bash
$ pnpm add eslint @tofrankie/eslint -D
```

Create an `eslint.config.js` in your project root:

```js
import { defineConfig } from '@tofrankie/eslint'

export default defineConfig()
```

### Prettier

```bash
$ pnpm add prettier @tofrankie/prettier -D
```

Create a `prettier.config.js` in your project root:

```js
export default '@tofrankie/prettier'
```

### Stylelint

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

```bash
$ pnpm add commitlint @tofrankie/commitlint -D
```

Create a `commitlint.config.js` in your project root:

```js
export default {
  extends: ['@tofrankie/commitlint'],
}
```
