import base from './base'
import { BASE_LANGUAGE_OPTIONS, MINIPROGRAM_LANGUAGE_OPTIONS } from './language-options'
import miniprogram from './miniprogram'
import pxtorem from './pxtorem'
import scss from './scss'
import uniapp from './uniapp'
import { mergeLanguageOptions } from './utils/merge-language-options'
import vue from './vue'
import vueScss from './vue-scss'
import wechatSvg from './wechat-svg'

export default base

export {
  base,
  BASE_LANGUAGE_OPTIONS,
  mergeLanguageOptions,
  miniprogram,
  MINIPROGRAM_LANGUAGE_OPTIONS,
  pxtorem,
  scss,
  uniapp,
  vue,
  vueScss,
  wechatSvg,
}
