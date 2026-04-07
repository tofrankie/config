# Flat Config Items

ESLint flat config is an array of config objects.

```js
;[
  {
    name: 'antfu/vue/rules',
    files: ['**/*.vue'],
    rules: {
      'vue/html-indent': 'off',
      'vue/html-self-closing': 'warn',
    },
  },
]
```

In this model:

- The whole object is a **config item**.
- `name` identifies that config item.
- `rules` is one field inside the config item.
- `rules['vue/html-indent']` is a single ESLint rule.

## `override` vs `append`

Use `composer.override(...)` when antfu already provides the config item and you want to modify that existing item.

Typical cases:

- change rules in `antfu/vue/rules`
- change plugins in `antfu/react/setup`
- change settings in `antfu/jsdoc/rules`

Use `composer.append(...)` when you need to add a new config item that antfu does not provide.

Typical cases:

- add a new file-scoped config item
- add a package-specific config item that antfu does not expose

## How To Find The `name`

For `composer.override(...)`, the `name` must match an existing config item name exactly, such as `antfu/vue/rules`.

Common ways to find it:

- inspect the generated configs with `toConfigs()`
- use ESLint config inspector to view the final config items
- read existing antfu or local feature code for known names

Example:

```ts
import { defineConfig } from '@tofrankie/eslint'

const configs = await defineConfig().toConfigs()

console.log(configs.map(item => item.name).filter(Boolean))
```

Typical results look like:

- `antfu/javascript/rules`
- `antfu/vue/rules`
- `antfu/react/setup`
- `antfu/jsdoc/setup`

For `composer.append(...)`, the `name` is your own config item name, so you define it yourself. Pick a stable, descriptive name such as `tofrankie/jsdoc/javascript`.

## Quick Rule Of Thumb

- Modify an existing antfu item: `override`
- Add a new item: `append`

## Related Docs

- [Config Layering](./config-layering.md)
