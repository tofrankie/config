# JSDoc Strategy

`@tofrankie/eslint` keeps an internal JSDoc mode switch in `src/core/jsdoc-mode.ts`.

## Modes

### `antfu`

Default mode.

- Keep antfu's built-in `jsdoc` support enabled.
- Append `@tofrankie/eslint` rule/settings overrides without re-registering the `jsdoc` plugin.
- This avoids `Cannot redefine plugin "jsdoc"` while preserving antfu's setup.

### `managed`

Fallback mode.

- Disable antfu's built-in `jsdoc` support.
- Register `eslint-plugin-jsdoc` configs directly inside `@tofrankie/eslint`.
- Use this only if antfu mode cannot express the needed settings/rules cleanly.

## Current Differences From antfu

`@tofrankie/eslint` currently layers these changes on top of antfu's JSDoc config:

- `jsdoc/check-syntax`: `error`
- `jsdoc/no-defaults`: `off`
- `jsdoc/require-jsdoc`: `off`
- `jsdoc/require-param-description`: `off`
- `jsdoc/require-property-description`: `off`
- `jsdoc/require-returns`: `off`
- `jsdoc/require-returns-type`: `off`
- `jsdoc/require-returns-description`: `off`
- `jsdoc/newline-after-description`: `off`
- `jsdoc/reject-any-type`: `off`
- JavaScript files keep `jsdoc/require-param-type: warn`
- TypeScript files use `jsdoc/require-param-type: off`
- `tagNamePreference.description`: `desc`
- `tagNamePreference.property`: `prop`
- `tagNamePreference.returns`: `return`

Keep this file in sync when the overrides change or when the internal mode flips.
