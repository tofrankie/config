# Config Layering

This document starts with **[@antfu/eslint-config](https://github.com/antfu/eslint-config)** (antfu): how the first argument handles **integration `overrides`**, how **flat fields** such as `rules` are fused into an extra config item, and the simplified ordering relative to rest-argument flat configs.

Then it covers **@tofrankie/eslint**: what it adds on top of antfu and how precedence stays aligned with antfu's first-argument semantics.

## Integration `overrides` vs. first-argument `rules`

In this package, `AntfuOptions` is `OptionsConfig & Omit<TypedFlatConfigItem, 'files'>` (see [`define-config.ts`](../src/types/define-config.ts)). The first argument therefore mixes **integration options** with **flat-config fields** from `TypedFlatConfigItem` (except `files`), including **`rules`**.

Do not confuse these two:

- **integration `overrides`**
  - e.g. `javascript.overrides`, `typescript.overrides`, `vue.overrides`
  - merged into a specific antfu integration config item (see `getOverrides` below)
- **first-argument `rules`**
  - the top-level `rules` property on that same object — i.e. `AntfuOptions['rules']`
  - not nested under `javascript` / `vue`; antfu fuses it into a separate appended flat config item (see below)

When this document says **`overrides` alone**, it means **integration `overrides`**, not the `rules` map.

---

## antfu: first argument

antfu's factory accepts a first argument that mixes:

- **integration options** such as `typescript`, `react`, `vue`, `javascript`
- **flat config fields** on the same object, such as `rules`, `plugins`, `settings`, `languageOptions`

### antfu: integration `overrides`

When building each integration's config item, antfu merges user overrides into that item's `rules`.

In `getOverrides(options, key)` antfu merges two sources:

1. deprecated top-level `options.overrides[key]`
2. integration-local `options[key].overrides`

**Merge order** (later wins over earlier):

1. `options.overrides[key]`
2. `options[key].overrides`

Inside each integration config item, those overrides are usually spread **after** antfu's built-in rules, so user integration `overrides` win over antfu's default for the same rule in that item.

### antfu: first-argument `rules` and other flat fields

antfu collects first-argument fields that belong on a flat config fragment into a **fused config**, including:

- `name`
- `languageOptions`
- `linterOptions`
- `processor`
- `plugins`
- `rules`
- `settings`

If that fused config is non-empty, it is appended as **one extra config item** after antfu's built-in items.

**Plain antfu** simplified order:

1. antfu built-in config items
2. first-argument fused config (includes `rules`, etc.)
3. rest-argument flat configs passed to `antfu(...)`

### antfu: precedence examples

**Integration `overrides` vs antfu built-in (same rule, same item):**

```js
import antfu from '@antfu/eslint-config'

export default antfu({
  javascript: {
    overrides: {
      'no-alert': 'error',
    },
  },
})
```

**First-argument `rules` vs rest (later flat config wins for the same global rule):**

```js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    rules: {
      'no-console': 'warn',
    },
  }
)
```

---

## @tofrankie/eslint: on top of antfu

`defineConfig(firstArg, ...rest)` still uses antfu as the base, but it now builds a package preset first and merges it into the first argument **before** calling `antfu(...)`.

### Difference from the old implementation

This package now:

1. resolves which package defaults should apply
2. builds a package preset as `Partial<AntfuOptions>`
3. merges `firstArg` with that package preset, with **user values winning**
4. passes the merged first argument to `antfu(...)` once
5. applies only post-antfu patches that cannot be expressed via `AntfuOptions`
6. keeps `rest` as later flat configs

So **first-argument `rules` now follow plain antfu again** and enter antfu's fused-config path instead of becoming a separate `tofrankie/user-rules` item.

### @tofrankie/eslint: simplified order

1. antfu built-in config items
2. package preset merged into the first argument
3. first-argument integration `overrides` and top-level `rules` inside the merged antfu input
4. post-antfu package patches (`node` / `pnpm` / `jsdoc`)
5. rest-argument flat configs

### @tofrankie/eslint: precedence examples

**Integration `overrides` vs this package's preset defaults:**

If you set `javascript.overrides['no-console']` and this package also provides a built-in `javascript.overrides['no-console'] = 'off'`, the two are merged **before** `antfu(...)`, so **user `overrides` win**.

**First-argument `rules` vs this package's built-in defaults:**

First-argument `rules` are part of antfu's fused config again, so they continue to act as the user's final global rule layer before `rest`.

Package presets themselves intentionally avoid using fused top-level `rules`.
If a package default cannot be expressed through an integration's `overrides`,
it is routed to a specific named config item after `antfu(...)` instead.

**First-argument `rules` vs rest:**

Rest configs are appended after antfu's fused config, so **rest can still win**.

---

## Practical Rule Of Thumb

- **antfu only:** use integration `overrides` to tweak an integration; use first-argument `rules` and rest for global or additional layers.
- **with @tofrankie/eslint:** package defaults are merged into the first argument first, user integration `overrides` and top-level `rules` still behave like antfu, and `rest` remains the strongest layer for file-scoped or final overrides.

## Related Docs

- [Flat Config Items](./flat-config-items.md)
