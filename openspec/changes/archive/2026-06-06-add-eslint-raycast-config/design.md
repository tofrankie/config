## Context

当前 `@tofrankie/eslint` 以 `defineConfig(firstArg, ...rest)` 为主入口，先将包内 preset 合并进第一参数，再交给 `@antfu/eslint-config` 生成基础 config item，最后通过 post-antfu patch 修补无法通过 antfu integration overrides 表达的规则族。仓库文档明确区分了两种接入方式：

- 能通过 antfu 集成 `overrides` 表达的默认值，优先在 preset 阶段合并
- antfu 本身没有对应 config item 或需要新增文件作用域 config item 的场景，使用 `composer.append(...)`

Raycast 扩展的需求是对 `**/package.json` 应用一组 JSONC 排序规则，这组规则既不是 antfu 现成的 integration overrides，也不对应 antfu 已存在的命名 config item，因此更适合作为包内新增的独立 config item 追加到 composer 中。

## Goals / Non-Goals

**Goals:**

- 提供一个清晰可发现的 `raycast` 配置入口，面向 Raycast 扩展项目启用 `package.json` 排序检查
- 让 Raycast 排序规则在默认情况下优先于 antfu 的相关默认层生效
- 保持与当前 `@tofrankie/eslint` 分层模型一致，避免引入与 `defineConfig` 既有语义冲突的新特例
- 用测试覆盖关键排序路径，确保规则内容与参考项目保持一致

**Non-Goals:**

- 不在这次变更里为所有 JSON/JSONC 文件引入通用排序规范
- 不重构 `defineConfig` 的整体合成流程
- 不处理 Raycast 之外的 manifest 或其他生态的 `package.json` 专用排序需求

## Decisions

### 1. 新增独立的 Raycast config item，而不是把规则塞进顶层 fused `rules`

采用 `composer.append(...)` 增加一个命名 config item，例如 `tofrankie/raycast/package-json`，限定 `files: ['**/package.json']`，并在其中声明 `jsonc` 插件、parser 与排序规则。

这样做的原因：

- Raycast 排序规则是文件作用域能力，不属于 antfu 现有 integration `overrides`
- 仓库文档建议“新增 antfu 不提供的 config item”使用 `append`
- 避免把 JSONC 相关 `plugins`/`languageOptions` 混进第一参数 fused config，降低对其他文件类型的影响面

备选方案：

- 方案 A：将规则直接合并到第一参数 `rules`
  - 放弃原因：无法同时自然表达 JSONC parser/plugin 和文件作用域，且不符合当前分层约束
- 方案 B：尝试 `composer.override(...)` 某个 antfu 现有 item
  - 放弃原因：不存在与 Raycast `package.json` 排序需求一一对应的 antfu config item

### 2. 以显式导出入口暴露 `raycast` 能力

在 `packages/eslint` 中增加面向用户的导出入口，使用户能够通过 `@tofrankie/eslint/raycast` 或等价公开 API 单独启用该能力。

这样做的原因：

- 用户需求明确要求导出 `@tofrankie/eslint/raycast`
- 将 Raycast 规则组织为单独入口，比隐式挂在通用 preset 上更容易理解和按需采用

备选方案：

- 方案 A：把 Raycast 规则默认并入通用 preset
  - 放弃原因：会让非 Raycast 项目也承载无关规则，扩大影响面

### 3. 排序内容对齐参考项目，但实现留在共享包内

排序键顺序、数组排序路径与特殊字段顺序应基于既有 Raycast 排序规则样例对齐，在共享包内重新组织为可维护常量或 helper，而不是运行时依赖外部项目文件。

这样做的原因：

- 参考项目已经沉淀了可用顺序定义
- 共享包需要自包含发布，不能依赖本地外部仓库
- 将顺序表内聚到共享包，更方便后续测试与版本管理

备选方案：

- 方案 A：直接读取外部项目文件
  - 放弃原因：不可发布、不可复现，也不适合作为包能力

### 4. 使用现成 Raycast 示例 package.json 作为排序测试基准

测试夹具优先复用现有 Raycast `package.json` 排序示例的结构，仅按当前包测试命名需要调整 `name` 字段或其他最小差异。

这样做的原因：

- 该示例已经覆盖了 Raycast 扩展 `package.json` 的关键结构，包括 `preferences`、`commands`、平台、脚本和依赖字段
- 直接复用成熟样本比手工重新拼装 fixture 更不容易遗漏排序路径
- 后续如果参考项目排序约定调整，可以更容易做差异比对

## Risks / Trade-offs

- [规则顺序与参考项目偏差] → 通过逐项比对 `sort.js` 并为关键路径补测试，降低回归风险
- [测试夹具与真实 Raycast 项目结构脱节] → 以 `examples/eslint-10/package.json` 为基础维护 fixture，只做最小必要改动
- [append 后仍被用户 rest config 覆盖] → 在文档中明确该层的相对位置，并根据实际导出方式控制默认接入顺序
- [引入 JSONC 解析能力后影响现有配置体积] → 将能力限制在 Raycast 入口或按需启用，避免影响非 Raycast 用户
- [导出路径设计与现有发布结构不一致] → 先对齐 `packages/eslint` 现有 exports 组织，再选择最小改动方案
