# Dependency Graph

Dependency relationships between the presets of `@tofrankie/tsconfig`.

```mermaid
flowchart TB
  subgraph core [Core]
    strict[strict.json]
    webApp[web.app.json]
    nodeApp[node.app.json]
  end

  subgraph app [Web App]
    reactApp[react.app.json]
    vueApp[vue.app.json]
  end

  subgraph lib ["Library (npm package)"]
    nodeLib[node.lib.json]
    reactLib[react.lib.json]
    vueLib[vue.lib.json]
  end

  subgraph test [Test]
    vitestNode[vitest.node.json]
    vitestWeb[vitest.web.json]
  end

  strict --> webApp
  strict --> nodeApp
  webApp --> reactApp
  webApp --> vueApp
  nodeApp --> nodeLib
  reactApp --> reactLib
  vueApp --> vueLib
  nodeApp --> vitestNode
  reactApp --> vitestWeb

  strictest["@tsconfig/strictest/tsconfig.json"] -.-> strict
  node20["@tsconfig/node20/tsconfig.json"] -.-> nodeApp
  vueDom["@vue/tsconfig/tsconfig.dom.json"] -.-> vueApp
  vueLibBase["@vue/tsconfig/tsconfig.lib.json"] -.-> vueLib
```

- **`A --> B`** means `A` is included in `B`'s `extends`.
- **`A -.-> B`** means `B` directly extends external npm preset `A`.
