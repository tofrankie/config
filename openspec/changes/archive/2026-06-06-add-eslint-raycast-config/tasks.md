## 1. 导出与配置建模

- [x] 1.1 盘点 `packages/eslint` 现有导出结构与发布 exports，确定 `@tofrankie/eslint/raycast` 的最小落地方案
- [x] 1.2 在 `packages/eslint` 中新增 Raycast 配置模块，收敛参考项目里的字段顺序与数组顺序常量
- [x] 1.3 按独立子路径导出 `@tofrankie/eslint/raycast` 默认成品 flat config，自带 `files: ['**/package.json']`

## 2. 行为验证

- [x] 2.1 以现有 Raycast `package.json` 排序示例为基准创建测试夹具，按当前测试需要仅调整 `name` 等最小字段
- [x] 2.2 验证 Raycast 配置作为独立 flat config 可在 `defineConfig({}, raycast)` 组合下位于 antfu 默认层之后，且用户后续 rest config 仍可覆盖
- [x] 2.3 确认 `eslint-plugin-jsonc` 与 parser 依赖已满足；如未满足，补充依赖和相应测试调整

## 3. 文档与收尾

- [x] 3.1 在 `packages/eslint` README 或相关文档中补充 Raycast 配置的使用方式与适用范围
- [x] 3.2 记录该配置与参考项目排序规则的一致性约束，便于后续维护
- [x] 3.3 自检 OpenSpec 产物与实现范围一致，准备进入归档阶段
