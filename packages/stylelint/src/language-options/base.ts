import type { LanguageOptions } from 'stylelint'

export const BASE_LANGUAGE_OPTIONS: LanguageOptions = {
  // https://stylelint.io/user-guide/configure/#syntax
  syntax: {
    types: {
      // https://webkit.org/blog/7929/designing-websites-for-iphone-x/
      // The env() function shipped in iOS 11 with the name constant(). Beginning with Safari Technology Preview 41 and the iOS 11.2 beta, constant() has been removed and replaced with env(). You can use the CSS fallback mechanism to support both versions, if necessary, but should prefer env() going forward.
      // 需与 'function-no-unknown': [true, { ignoreFunctions: ['constant'] }] 配合使用
      'constant()':
        'constant( safe-area-inset-top | safe-area-inset-right | safe-area-inset-bottom | safe-area-inset-left )',
    },
    properties: {
      padding: '| <constant()>',
      'padding-top': '| <constant()>',
      'padding-right': '| <constant()>',
      'padding-bottom': '| <constant()>',
      'padding-left': '| <constant()>',
      margin: '| <constant()>',
      'margin-top': '| <constant()>',
      'margin-right': '| <constant()>',
      'margin-bottom': '| <constant()>',
      'margin-left': '| <constant()>',
      top: '| <constant()>',
      right: '| <constant()>',
      bottom: '| <constant()>',
      left: '| <constant()>',
    },
  },
}
