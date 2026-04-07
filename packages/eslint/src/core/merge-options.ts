import { createDefu } from 'defu'

// Rule option arrays should be replaced by user values instead of being merged by index.
export const mergeOptions = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
  return false
})
