## ADDED Requirements

### Requirement: Raycast config export

`@tofrankie/eslint` SHALL 提供一个面向 Raycast 扩展项目的公开配置入口，使使用者能够启用 Raycast `package.json` 排序检查，而无需复制本地规则文件。

#### Scenario: Consumer imports Raycast config

- **WHEN** 用户在 Raycast 扩展项目中引用 `@tofrankie/eslint/raycast` 或本次变更定义的等价公开入口
- **THEN** 用户可以获得包含 Raycast `package.json` 排序规则的 ESLint flat config 能力

### Requirement: Raycast package.json key ordering

Raycast 配置 SHALL 对匹配 `package.json` 的文件启用键排序规则，并按 Raycast 扩展约定校验根对象、命令对象、偏好项、参数项、工具项和相关嵌套对象的键顺序。

#### Scenario: Root package.json keys are validated

- **WHEN** Raycast 扩展项目的 `package.json` 根级字段顺序不符合约定顺序
- **THEN** ESLint 应报告 `jsonc/sort-keys` 违规

#### Scenario: Nested command and preference keys are validated

- **WHEN** `commands`、`preferences`、`arguments`、`tools` 或 `ai` 节点中的键顺序不符合约定
- **THEN** ESLint 应报告对应的 `jsonc/sort-keys` 违规

### Requirement: Raycast package.json array ordering

Raycast 配置 SHALL 对特定数组字段启用值排序规则，至少覆盖 `files`、`keywords`、`commands[*].keywords`、`categories`、`platforms` 与 `external`，并对依赖、override 与 exports 相关键应用既定顺序约束。

#### Scenario: Array values are validated

- **WHEN** `package.json` 中受支持数组字段的元素顺序不符合约定
- **THEN** ESLint 应报告 `jsonc/sort-array-values` 违规

#### Scenario: Special platform ordering is preserved

- **WHEN** `platforms` 字段出现 `macOS` 和 `Windows`
- **THEN** ESLint 应按约定顺序校验它们，而不是简单按字母排序

### Requirement: Raycast config precedence

Raycast 配置 SHALL 通过与当前仓库分层模型一致的方式接入，使其默认优先级高于 antfu 的默认相关层，同时保持用户显式追加的后续 rest config 仍可作为最终覆盖层。

#### Scenario: Raycast defaults override base layers

- **WHEN** antfu 默认层与 Raycast 排序能力在相同文件范围内存在冲突或缺省差异
- **THEN** Raycast 配置应作为更后面的生效层提供其默认排序规则

#### Scenario: User rest config can still override

- **WHEN** 用户在 `defineConfig(..., extraConfig)` 的后续 rest config 中显式声明同一路径上的 JSONC 规则
- **THEN** 用户后续 rest config 应继续作为最终覆盖层生效
