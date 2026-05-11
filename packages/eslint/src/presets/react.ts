import type { ConfigItemRules } from '../types'

/**
 * - rule: `react/x-*`, `react/jsx-*`, `react/rsc-*`, `react/dom-*`, `react/web-api-*`, `react/naming-convention-*`
 * - original rule: `@eslint-react/*`, `@eslint-react/jsx-*`, `@eslint-react/rsc-*`, `@eslint-react/dom-*`, `@eslint-react/web-api-*`, `@eslint-react/naming-convention-*`
 * - plugin: `@eslint-react/eslint-plugin`
 * @see https://www.eslint-react.xyz/docs/rules
 * @see https://github.com/Rel1cx/eslint-react/tree/main/plugins/eslint-plugin
 */
export const REACT_RULES = {
  'react/set-state-in-effect': 'off',
} satisfies ConfigItemRules
