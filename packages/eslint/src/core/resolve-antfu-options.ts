import type { AntfuOptions } from '../types'
import { DEFAULT_OPTIONS } from './default-options'
import { mergeOptions } from './merge-options'

export function resolveAntfuOptions(userOptions: AntfuOptions): AntfuOptions {
  const options = mergeOptions(userOptions, DEFAULT_OPTIONS) as AntfuOptions

  return {
    ...options,
    formatters: resolveFormattersOption(userOptions.formatters),
  }
}

type FormattersOption = AntfuOptions['formatters']

function resolveFormattersOption(value: FormattersOption): FormattersOption {
  // Explicit false should fully disable formatter integrations.
  if (value === false) {
    return false
  }

  // Keep `true` as a safe shortcut: enable the same formatter set as antfu's
  // boolean mode, while still inheriting our default prettierOptions base config.
  if (value === true) {
    return mergeOptions(
      {
        css: true,
        graphql: true,
        html: true,
        markdown: true,
      },
      DEFAULT_OPTIONS.formatters ?? {}
    ) as AntfuOptions['formatters']
  }

  // For partial formatter objects, merge user fields with our defaults so
  // prettierOptions stay aligned with @tofrankie/prettier unless overridden.
  return mergeOptions(value ?? {}, DEFAULT_OPTIONS.formatters ?? {}) as AntfuOptions['formatters']
}
