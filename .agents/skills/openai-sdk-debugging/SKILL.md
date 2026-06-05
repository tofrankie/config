---
name: openai-sdk-debugging
description: Debugs OpenAI or OpenAI-compatible Node.js SDK integrations, including API key/baseURL setup, model availability checks, empty response parsing, Responses vs Chat Completions formats, DNS/network failures, and safe diagnostics.
---

# OpenAI SDK 调试流程

用于排查 OpenAI 官方 API 或兼容网关调用失败。

## 先确认配置

1. 检查环境变量来源：
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL` 或项目自定义 baseURL
   - `.env.example` 是否说明代理/网关场景
2. 不打印密钥；日志中只显示 key 是否存在、baseURL host、错误 code。
3. 如果用户问“当前 key 支持哪些模型”，需要真实调用模型列表接口；没有 key 就说明无法判断。

## 复现与分流

1. 复跑用户的命令或最小脚本。
2. 将失败分为：
   - 配置缺失：无 key、baseURL 缺 `/v1`、env 未加载
   - 网络问题：`ENOTFOUND`、timeout、TLS、代理不可达
   - 权限/账单/模型不可用：401、403、404、429
   - 响应解析问题：SDK 返回结构存在但业务代码当成空
3. 对网络/DNS 错误，直接暴露 `code`、`host`、`baseURL`，不要让它埋在 SDK stack 里。

## 响应解析兼容

业务代码不要只读一种字段。按项目需要兼容：

- Chat Completions：`choices[].message.content`
- Responses API：`output_text`、`output[].content[].text`
- 分片或多段 content：数组文本拼接

解析失败时记录结构摘要，不记录正文敏感内容。

## 验证

- 配置修复后重跑同款命令
- 如网络受限，说明本地已验证到哪一层
- 更新 `.env.example` 和错误提示文案，让下一次失败一眼可判定

## 输出要求

- 明确区分“代码问题已修”和“环境/网络仍阻塞”
- 给出用户下一步只需做的最小动作
- 不把 API key、完整请求正文或私密响应写入日志/回复
