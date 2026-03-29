# Dependency Graph

Dependency relationships between the presets of `@tofrankie/tsconfig`.

```mermaid
flowchart TB
  subgraph strictEntry [strict]
    strict[strict.json]
  end

  subgraph runtime [Runtime]
    node[node.json]
    dom[dom.json]
  end

  subgraph libShape [Library]
    lib[lib.json]
  end

  subgraph webApp [Web App]
    reactApp[react.json]
    vueApp[vue.json]
  end

  subgraph webAppVite [Web App + Vite]
    reactVite[react.vite.json]
    vueVite[vue.vite.json]
  end

  subgraph webLib [Web Component Library]
    reactLib[react.lib.json]
    vueLib[vue.lib.json]
  end

  subgraph webLibVite [Web Component Library + Vite]
    reactLibVite[react.lib.vite.json]
    vueLibVite[vue.lib.vite.json]
  end

  subgraph nodePkg [Node Library]
    nodeLib[node.lib.json]
    nodeLibTsdown[node.lib.tsdown.json]
  end

  subgraph testing [Testing]
    vitest[vitest.json]
  end

  strict --> dom
  strict --> lib
  strict --> node

  dom --> reactApp
  dom --> vueApp
  dom --> reactLib
  dom --> vueLib
  lib --> reactLib
  lib --> vueLib
  lib --> nodeLib
  node --> nodeLib
  lib --> nodeLibTsdown
  node --> nodeLibTsdown

  reactApp --> reactVite
  vueApp --> vueVite

  reactLib --> reactLibVite
  vueLib --> vueLibVite

  node --> vitest

  node20["base/tsconfig/node20/tsconfig.json"] -.-> node
  viteReact["base/tsconfig/vite-react/tsconfig.json"] -.-> reactVite
  vueDom["base/vue/tsconfig/tsconfig.dom.json"] -.-> vueApp
  vueLibSnap["base/vue/tsconfig/tsconfig.lib.json"] -.-> vueLib
```

- **`A --> B`** means `A` is included in `B`'s `extends`.
