# @tofrankie/tsconfig

![npm version](https://img.shields.io/npm/v/@tofrankie/tsconfig) ![node version](https://img.shields.io/node/v/@tofrankie/tsconfig) ![npm package license](https://img.shields.io/npm/l/@tofrankie/tsconfig) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/tsconfig)

Shared [TypeScript](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configuration.

> [!IMPORTANT]
> Before 1.0.0, releases may include breaking changes. Read the [CHANGELOG](CHANGELOG.md) before upgrading.

## Quick Start

```bash
$ pnpm add typescript @tofrankie/tsconfig -D
```

Create a `tsconfig.json` in your project root:

```jsonc
{
  "extends": "@tofrankie/tsconfig/react.vite.json",
  // add compilerOptions, include, etc. as needed
}
```

## Presets

Use `@tofrankie/tsconfig/<filename>` in `extends`. When the **Extra dependencies** column is not `-`, add the listed packages to your project's `devDependencies`.

| Preset                 | Purpose (how to choose)                                  | Extra dependencies      |
| ---------------------- | -------------------------------------------------------- | ----------------------- |
| `strictest.json`       | Strictest rules                                          | -                       |
| `strict.json`          | Strict rules                                             | -                       |
| `dom.json`             | Web App / DOM API                                        | -                       |
| `node.json`            | Node scripts / services / CLI (`@tsconfig/node20`)       | -                       |
| `lib.json`             | npm packages to publish (independent of runtime)         | -                       |
| `node.lib.json`        | Node packages to publish                                 | -                       |
| `node.lib.tsdown.json` | Node libraries for tsdown (bundler resolution, `noEmit`) | -                       |
| `react.json`           | React App (bundler-agnostic)                             | -                       |
| `react.vite.json`      | React + Vite                                             | `vite`                  |
| `react.lib.json`       | React component libraries to publish                     | -                       |
| `react.lib.vite.json`  | React component libraries developed with Vite            | `vite`                  |
| `vue.json`             | Vue 3 App (bundler-agnostic)                             | -                       |
| `vue.vite.json`        | Vue 3 + Vite                                             | `vite`                  |
| `vue.lib.json`         | Vue 3 component libraries to publish                     | -                       |
| `vue.lib.vite.json`    | Vue 3 component libraries developed with Vite            | `vite`                  |
| `vitest.json`          | Testing with Vitest                                      | `@types/node`, `vitest` |

Dependency relationships between them: **[DEPENDENCY_GRAPH](./DEPENDENCY_GRAPH.md)**.

## Examples

### React + Vite

`tsconfig.json`

```json
{
  "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }],
  "files": []
}
```

`tsconfig.app.json`

```json
{
  "extends": "@tofrankie/tsconfig/react.vite.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo"
  },
  "include": ["src"]
}
```

`tsconfig.node.json`

```json
{
  "extends": "@tofrankie/tsconfig/node.json",
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo"
  },
  "include": ["vite.config.ts"]
}
```

## Acknowledgements

Thanks to these referenced packages:

- `@tsconfig/node20`
- `@tsconfig/strictest`
- `@tsconfig/vite-react`
- `@vue/tsconfig`

## License

MIT
