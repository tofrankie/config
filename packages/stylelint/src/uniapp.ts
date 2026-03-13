import type { Config } from 'stylelint'
import { MINIAPP_SHARED_CONFIG } from './shared/miniapp'

export default {
  ...MINIAPP_SHARED_CONFIG,
} satisfies Config
