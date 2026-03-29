# @tofrankie/tsconfig

![npm version](https://img.shields.io/npm/v/@tofrankie/tsconfig) ![node version](https://img.shields.io/node/v/@tofrankie/tsconfig) ![npm package license](https://img.shields.io/npm/l/@tofrankie/tsconfig) ![npm last update](https://img.shields.io/npm/last-update/@tofrankie/tsconfig)

Shared [tsconfig](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) configuration.

> [!IMPORTANT]
> Presets are not yet stable and may change.

## Usage

```bash
$ pnpm add typescript @tofrankie/tsconfig -D
```

Create a `tsconfig.json` in your project root:

```json
{
  "extends": "@tofrankie/tsconfig/react.vite.json"
  // other options...
}
```

## Presets

Use `@tofrankie/tsconfig/<filename>` in `extends`. If the last column of the table is not `—`, also add those packages to this project's devDependencies.

| Preset                | Purpose (how to choose)                            | Extra dependencies      |
| --------------------- | -------------------------------------------------- | ----------------------- |
| `strict.json`         | Stricter rules                                     | —                       |
| `dom.json`            | Web App / DOM API                                  | —                       |
| `node.json`           | Node scripts / services / CLI (`@tsconfig/node20`) | —                       |
| `lib.json`            | npm packages to publish (independent of runtime)   | —                       |
| `node.lib.json`       | Node packages to publish                           | —                       |
| `react.json`          | React App (bundler-agnostic)                       | —                       |
| `react.vite.json`     | React + Vite                                       | `vite`                  |
| `react.lib.json`      | React component libraries to publish               | —                       |
| `react.lib.vite.json` | React component libraries developed with Vite      | `vite`                  |
| `vue.json`            | Vue 3 App (bundler-agnostic)                       | —                       |
| `vue.vite.json`       | Vue 3 + Vite                                       | `vite`                  |
| `vue.lib.json`        | Vue 3 component libraries to publish               | —                       |
| `vue.lib.vite.json`   | Vue 3 component libraries developed with Vite      | `vite`                  |
| `vitest.json`         | Testing with Vitest                                | `@types/node`, `vitest` |

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
