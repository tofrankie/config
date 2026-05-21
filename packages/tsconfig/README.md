# @tofrankie/tsconfig

![npm version](https://img.shields.io/npm/v/@tofrankie/tsconfig) ![node version](https://img.shields.io/node/v/@tofrankie/tsconfig) ![npm package license](https://img.shields.io/npm/l/@tofrankie/tsconfig) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/tsconfig)

Shared [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Install

```bash
$ pnpm add typescript @tofrankie/tsconfig -D
```

Install additional dependencies based on your scenario:

- Node projects usually need: `@types/node`
- Vitest projects usually need: `vitest`, `@types/node`
- Vite projects usually need: `vite`

## Quick Start

Choose one preset based on your project:

- `@tofrankie/tsconfig/web.app.json` - Web App (framework-agnostic)
- `@tofrankie/tsconfig/react.app.json` - React Web App
- `@tofrankie/tsconfig/react.lib.json` - React Library (npm package)
- `@tofrankie/tsconfig/vue.app.json` - Vue Web App
- `@tofrankie/tsconfig/vue.lib.json` - Vue Library (npm package)
- `@tofrankie/tsconfig/node.app.json` - Node Application/Script
- `@tofrankie/tsconfig/node.lib.json` - Node Library (npm package)
- `@tofrankie/tsconfig/vitest.web.json` - Vitest (Web)
- `@tofrankie/tsconfig/vitest.node.json` - Vitest (Node)
- `@tofrankie/tsconfig/strict.json` - Strict

Then extend it from your `tsconfig.json`. For example, for a React web app:

```jsonc
{
  "extends": "@tofrankie/tsconfig/react.app.json",
  "compilerOptions": {
    // your custom compiler options
    // ...
  },
}
```

## CLI

An interactive CLI is included to scaffold your `tsconfig` files quickly. After generation, adjust the output files to match your project needs.

```bash
$ npx @tofrankie/tsconfig
```

## License

MIT License © [Frankie](https://github.com/tofrankie)
