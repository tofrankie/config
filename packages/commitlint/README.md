# @tofrankie/commitlint

![npm version](https://img.shields.io/npm/v/@tofrankie/commitlint) ![node version](https://img.shields.io/node/v/@tofrankie/commitlint) ![npm package license](https://img.shields.io/npm/l/@tofrankie/commitlint) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/commitlint)

Shared [commitlint](https://commitlint.js.org/guides/getting-started.html) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

Install dependencies:

```bash
$ pnpm add @commitlint/cli @tofrankie/commitlint -D
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

## Using with simple-git-hooks and lint-staged

Install dependencies:

```bash
$ pnpm add simple-git-hooks lint-staged -D
```

Add `simple-git-hooks` to `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged",
    "commit-msg": "pnpm commitlint --edit $1"
  }
}
```

After you change this configuration, run:

```bash
$ npx simple-git-hooks
```

Add `lint-staged.config.js` to the project root:

```js
export default {
  '*.{js,ts,jsx,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yaml,html}': ['prettier --write'],
  '*.wxml': ['prettier --write', 'stylelint --fix'],
  '*.{css,scss,less,wxss}': ['prettier --write', 'stylelint --fix'],
}
```

> Adjust the globs to match the file types you lint. See [lint-staged configuration](https://github.com/lint-staged/lint-staged#configuration) for more.

## Using with Husky and lint-staged

Install dependencies:

```bash
$ pnpm add husky lint-staged -D
```

Add Husky to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

Add `lint-staged.config.js` to the project root (same as above).

Add a `pre-commit` hook:

```bash
$ echo 'pnpm lint-staged' > .husky/pre-commit
```

> For a full-project lint, use `pnpm lint` or whatever script you define in `package.json`.

Add a `commit-msg` hook:

```bash
$ echo 'pnpm commitlint --edit "$1"' > .husky/commit-msg
```

## Other

### Skipping hooks

Use `-n` / `--no-verify` to skip Git hooks:

```bash
$ git commit -m "commit message" --no-verify
```

Use `HUSKY=0` to skip Husky:

```bash
$ HUSKY=0 git commit -m "commit message"
```

Use `SKIP_SIMPLE_GIT_HOOKS=1` to skip simple-git-hooks:

```bash
$ SKIP_SIMPLE_GIT_HOOKS=1 git commit -m "commit message"
```

To skip hooks for multiple commits in a row, export an environment variable:

```bash
$ export HUSKY=0 # Disables all Git hooks

$ git commit -m "first commit"
$ git commit -m "second commit"

$ unset HUSKY # Re-enables hooks

$ git commit -m "third commit"
```

> The same applies to simple-git-hooks.

### Troubleshooting: migrating from Husky to simple-git-hooks

See: [When migrating from husky git hooks are not running](https://github.com/toplenboren/simple-git-hooks?tab=readme-ov-file#when-migrating-from-husky-git-hooks-are-not-running)
