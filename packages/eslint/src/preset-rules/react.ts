import type { Linter } from 'eslint'

/**
 * - rule: `react/*`、`react-hooks-extra/*`
 * - plugin: `eslint-plugin-react-hooks-extra`
 * @see https://www.npmjs.com/package/eslint-plugin-react-hooks-extra
 */
export const REACT_PRESET_RULES: Linter.RulesRecord = {
  'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
}
