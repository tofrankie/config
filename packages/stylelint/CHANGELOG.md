# Changelog

## stylelint@0.0.16 (2026-04-02)

- Update `@tofrankie/postcss-wxml` to `v0.0.4`

## stylelint@0.0.15 (2026-04-01)

- Use `@tofrankie/postcss-wxml` to parse WXML files
- Disable `no-empty-source` rule in `miniprogram` preset

## stylelint@0.0.14 (2026-03-30)

- Disable `no-empty-source` rule in `miniprogram` preset

## stylelint@0.0.13 (2026-03-29)

- Add `@tofrankie/tsconfig` to `devDependencies`

## stylelint@0.0.12 (2026-03-27)

### Changed

- Re-export `@tofrankie/stylelint/miniapp` as `@tofrankie/stylelint/miniprogram`.
- Re-export `MINIAPP_LANGUAGE_OPTIONS` as `MINIPROGRAM_LANGUAGE_OPTIONS`.
- Re-export `miniappConfig` as `miniprogramConfig`.

## stylelint@0.0.11 (2026-03-27)

### Changed

- Bump `stylelint` peer dependency to `v17.6.0`
- Change `function-url-quotes`:
  - non-HTML / non-WXML files: `'never'` → `'always'`
  - HTML and WXML files: remain `'never'`

### Added

- Support the `rpx` length unit in miniprogram styles
- Export `mergeLanguageOptions`, `STANDARD_LANGUAGE_OPTIONS`, and `MINIPROGRAM_LANGUAGE_OPTIONS`

### Fixed

- Fix `languageOptions` merge behavior when extending presets

## stylelint@0.0.10 (2026-03-25)

- Update `stylelint` to `v17.5.0`

## stylelint@0.0.9 (2026-03-19)

- Integrate stylelint-config-html: default preset uses `stylelint-config-html/html` for HTML parsing
- Refactor `@tofrankie/stylelint/vue` and `@tofrankie/stylelint/vue-scss`: add dedicated `vue-scss` preset (extends `stylelint-config-standard-vue/scss`)
- Native Miniprogram: add `.wxml` support

## stylelint@0.0.8 (2026-03-18)

- Update `stylelint-config-recess-order` to `v7.7.0`
- Update `stylelint-order` to `v8.1.1`

## stylelint@0.0.7 (2026-03-15)

- Update `selector-type-no-unknown` rule for miniprogram

## stylelint@0.0.6 (2026-03-14)

- Add `uniapp` config
- Update `@tofrankie/stylelint/vue` customSyntax to `postcss-html`
- Update `stylelint`, `stylelint-order` dependencies

## stylelint@0.0.5 (2026-02-24)

- Add `value-keyword-case` rule
- Update `order/properties-order` rule

## stylelint@0.0.4 (2026-02-24)

- Add `wechat-svg` config
- Add `@stylistic/declaration-block-semicolon-space-after`, `@stylistic/string-quotes` rules
- Add `function-url-quotes` rule

## stylelint@0.0.3 (2026-02-23)

- Add `declaration-property-value-no-unknown` rule for miniprogram

## stylelint@0.0.2 (2026-02-20)

- Update `exports` field for CommonJS compatibility

## stylelint@0.0.1 (2026-02-10)

- Initial alpha release
