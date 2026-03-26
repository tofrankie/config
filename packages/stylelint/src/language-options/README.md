# 说明

通过 `extends: ['standard', 'miniapp']` 扩展使用时，若二者都有配置 `languageOptions`，后者会覆盖前者，不会做合并。

`stylelint` 的 `extends` 组合在同名字段上通常表现为“后者覆盖”，因此当你需要把多个 preset 的 `languageOptions` 合并成“base + 叠加”的效果时，推荐使用本包提供的工具。

本包对外导出：

- `STANDARD_LANGUAGE_OPTIONS`
- `MINIAPP_LANGUAGE_OPTIONS`
- `mergeLanguageOptions(optionA, optionB, ...)`：按参数顺序依次深合并；数组使用并集去重策略。

另外，`@tofrankie/stylelint/miniapp` preset 内部的 `overrides[*].languageOptions` 已经按 `STANDARD_LANGUAGE_OPTIONS` + `MINIAPP_LANGUAGE_OPTIONS` 的方式做了合并，所以直接使用 `miniapp` 时也不会丢失 standard 里的语法配置（如 `constant()`）。
