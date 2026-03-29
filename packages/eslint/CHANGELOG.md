# Changelog

## eslint@0.0.17 (2026-03-29)

- Add `@tofrankie/tsconfig` to `devDependencies`

## eslint@0.0.16 (2026-03-24)

- Add `unicorn/number-literal-case` rule
- Update `style/operator-linebreak` rule
- Disable `e18e/ban-dependencies`、`e18e/prefer-array-to-sorted`、`e18e/prefer-static-regex` rules

## eslint@0.0.15 (2026-03-17)

- Require Node.js 20.x (`engines: ^20.0.0 || ^22.0.0 || ^24.0.0`)
- Update `@antfu/eslint-config` to `v7.7.3`

## eslint@0.0.14 (2026-03-14)

- Move `@antfu/eslint-config` from `peerDependencies` to `dependencies`

## eslint@0.0.13 (2026-03-14)

- Disable `style/multiline-ternary`, `style/jsx-wrap-multilines`, `style/jsx-curly-newline`, `style/jsx-one-expression-per-line` rules to avoid conflicts with Prettier

## eslint@0.0.12 (2026-03-13)

- Update `style/operator-linebreak` rule
- Disable `style/indent` rule to avoid conflicts with Prettier

## eslint@0.0.11 (2026-03-13)

- Add `style/member-delimiter-style` rule
- Update `style/operator-linebreak` rule
- Disable `style/indent-binary-ops` rule to avoid conflicts with Prettier
- Update `@antfu/eslint-config` to v7.7.2 and its related dependencies

## eslint@0.0.10 (2026-02-26)

- Update `@antfu/eslint-config` to v7.6.1 and its related dependencies
- Disable `react-hooks-extra/no-direct-set-state-in-use-effect` rule
- Disable `jsdoc/reject-any-type` rule

## eslint@0.0.9 (2026-02-22)

- Disable `vue/singleline-html-element-content-newline`, `vue/html-closing-bracket-newline`, `vue/html-indent` to avoid conflicts with Prettier
- Add `vue/html-self-closing` for consistency with Prettier
- Add `style/quote-props` for consistency with Prettier

## eslint@0.0.8 (2026-02-21)

- Update `style/quotes` rule

## eslint@0.0.7 (2026-02-21)

- Update `style/operator-linebreak` rule

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
