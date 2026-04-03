# Changelog

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
