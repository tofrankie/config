import { describe, expect, it } from 'vitest'
import { MINIPROGRAM_LANGUAGE_OPTIONS } from '../src/index.js'

describe('@tofrankie/eslint language options', () => {
  it('exports miniprogram language options', () => {
    expect(MINIPROGRAM_LANGUAGE_OPTIONS).toEqual({
      globals: {
        wx: true,
        App: true,
        getApp: true,
        getCurrentPages: true,
        Page: true,
        Component: true,
        Behavior: true,
        requireMiniProgram: true,
        requirePlugin: true,
      },
    })
  })
})
