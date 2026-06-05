## Why

Raycast 扩展项目的 `package.json` 有一套特定的字段和数组排序约定，现有 `@tofrankie/eslint` 还没有开箱即用的配置项来覆盖这类约束。补充一个 `raycast` 配置项可以让 Raycast 扩展项目直接复用统一规则，避免每个项目单独维护 JSON 排序配置。

## What Changes

- 为 `@tofrankie/eslint` 新增 `raycast` 配置项导出，面向 Raycast 扩展项目启用 `package.json` 排序规则
- 将 Raycast 扩展所需的 `jsonc/sort-keys` 与 `jsonc/sort-array-values` 规则收敛到包内实现，排序内容参考现有 Raycast 排序规则样例
- 采用符合当前仓库分层策略的方式接入该配置项，确保其优先级能够覆盖 antfu 默认层，并避免与用户自定义 rest config 的语义冲突
- 为新配置补充文档与测试，明确适用文件范围和排序行为

## Capabilities

### New Capabilities

- `raycast-eslint-config`: 为 Raycast 扩展项目提供可直接启用的 `package.json` 排序 ESLint 配置

### Modified Capabilities

## Impact

- 影响代码：`packages/eslint` 的导出入口、配置解析/预设或 post-antfu patch 逻辑、测试与 README/文档
- 影响用户接口：新增 `@tofrankie/eslint/raycast` 或等价配置入口
- 影响依赖：需要确认是否已具备 `eslint-plugin-jsonc` 及其解析能力，如未具备则补充到 `packages/eslint`
