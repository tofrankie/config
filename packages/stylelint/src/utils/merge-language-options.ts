import type { LanguageOptions } from 'stylelint'
import merge from 'deepmerge'

/**
 * Merge multiple `LanguageOptions` objects.
 *
 * Note: since stylelint's `extends` does not deep-merge `languageOptions` reliably,
 * this helper makes the merge strategy explicit and reusable.
 * @param options
 */
export function mergeLanguageOptions(...options: LanguageOptions[]): LanguageOptions {
  const filteredOptions = options.filter(Boolean) as LanguageOptions[]
  if (filteredOptions.length === 0) {
    return {} as LanguageOptions
  }

  if (filteredOptions.length === 1) {
    return filteredOptions[0]
  }

  return merge.all(filteredOptions, {
    arrayMerge: (destinationArray: unknown[], sourceArray: unknown[]) => [...destinationArray, ...sourceArray],
  }) as LanguageOptions
}
