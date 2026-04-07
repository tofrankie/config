import type { ConfigItemRules } from '../types'

/**
 * - rule: `react/*`
 * - original rule: `react-x/*`
 * - plugin: `@eslint-react/eslint-plugin`
 * @see https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin
 */
export const REACT_RULES = {
  'react/set-state-in-effect': 'off',
} satisfies ConfigItemRules
