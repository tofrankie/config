# Changelog

## tsconfig@0.2.0 (2026-06-03)

- Update peer dependencies to `typescript@>=5.5.0`
- Update `target` option to `ES2023`
- Fix `tsBuildInfoFile` option using `${configDir}` placeholder

## tsconfig@0.1.3 (2026-06-01)

- Add `tsBuildInfoFile` option to all presets (except `strict.json`)

## tsconfig@0.1.2 (2026-05-23)

- Disable `declarationMap` in `node.lib.json`, `react.lib.json`, `vue.lib.json`

## tsconfig@0.1.1 (2026-05-22)

- Update `@tofrankie/tsconfig` CLI

## tsconfig@0.1.0 (2026-05-22)

### Breaking Changes 🚨

- Redesign preset and naming system
- Added exports: `web.app.json`, `react.app.json`, `vue.app.json`, `node.app.json`, `node.lib.json`, `react.lib.json`, `vue.lib.json`, `vitest.web.json`, `vitest.node.json`, `strict.json`
- Removed exports: `dom.json`, `node.json`, `lib.json`, `strictest.json`, `vitest.json`, `react.vite.json`, `vue.vite.json`, `react.lib.vite.json`, `vue.lib.vite.json`, `node.lib.tsdown.json`

### Features

- Added interactive CLI (`npx @tofrankie/tsconfig`) to scaffold `tsconfig` files

---

## tsconfig@0.0.5 (2026-04-04)

- Update documentation

## tsconfig@0.0.4 (2026-03-31)

- Update `node.lib.tsdown.json` preset: disable `declarationMap`
  - Because tsdown `sourcemap` option will always be `true` if you have [`declarationMap`](https://www.typescriptlang.org/tsconfig/#declarationMap) option enabled in your `tsconfig.json`.

## tsconfig@0.0.3 (2026-03-30)

- Add `strictest.json` preset (formerly the `strict.json` preset)
- Update `strict.json` preset: disable `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and `noPropertyAccessFromIndexSignature`
- Update `vitest.json` preset: enable `noEmit`

## tsconfig@0.0.2 (2026-03-29)

- Add `node.lib.tsdown.json` preset

## tsconfig@0.0.1 (2026-03-29)

- Initial release
