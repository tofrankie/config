# Changelog

## eslint@0.0.6 (2026-02-20)

- Update `exports` field for CommonJS compatibility

## eslint@0.0.5 (2026-02-20)

- Add `jsdoc` preset config

## eslint@0.0.4 (2026-02-13)

### BREAKING CHANGE

- `defineConfig(antfuOptions?, ...userFlatConfigs)` - New API signature
  - First param: antfu options (formatters, typescript, rules, etc.), merge with user options
  - Rest params: ESLint flat configs, appended after preset configs

### Features

- TypeScript support enabled by default

## eslint@0.0.3 (2026-02-11)

- Add `antfu/if-newline` rule
- Add `antfu/consistent-list-newline` rule

## eslint@0.0.2 (2026-02-11)

- Add `no-unused-vars` rule
- Add `style/quotes` rule
- Add `style/arrow-parens` rule
- Add `style/brace-style` rule
- Add `style/operator-linebreak` rule
- Add `style/comma-dangle` rule
- Add `eslint-comments/no-unlimited-disable` rule

## eslint@0.0.1 (2026-02-10)

- Initial alpha release
