import type { Linter } from 'eslint'

/**
 * - rule: `vue/*`
 * - plugin: `eslint-plugin-vue`
 * @see https://eslint.vuejs.org/rules/
 */
export const VUE_PRESET_RULES: Linter.RulesRecord = {
  // https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
  'vue/singleline-html-element-content-newline': 'off', // 避免与 prettier 冲突
  // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
  'vue/html-closing-bracket-newline': 'off', // 避免与 prettier 冲突
  // https://eslint.vuejs.org/rules/html-indent.html
  'vue/html-indent': 'off', // 避免与 prettier 冲突
  'vue/html-self-closing': [
    'warn',
    {
      html: {
        void: 'always', // 与 Prettier 保持一致，对于 <br />、<img /> 此类 void element 保留末尾 />，而不是 vue/html-self-closing 默认推荐的 <br>、<img>
        normal: 'always', // 对于 <div></div> 此类无内容的非 void element 处理成 <div /> 以符合 Vue 推荐的风格 https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components
        component: 'always', // 对于 <my-component></my-component> 此类无内容的自定义组件处理成 <my-component /> 以符合 Vue 推荐的风格 https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components
      },
      svg: 'always',
      math: 'always',
    },
  ],
}
