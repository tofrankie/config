import type { ConfigItemRules } from '../types'

/**
 * - rule: `markdown/*`
 * - plugin: `@eslint/markdown`
 * @see https://github.com/antfu/eslint-config
 * @see https://github.com/eslint/markdown
 */
export const MARKDOWN_RULES = {
  'markdown/require-alt-text': 'off',
} satisfies ConfigItemRules
