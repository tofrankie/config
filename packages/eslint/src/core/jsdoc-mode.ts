import type { JsdocMode } from '../types'

// Default to antfu-managed jsdoc and only layer project-specific overrides on top.
// Switch to `managed` if we need to fully own jsdoc plugin/config registration.
export const INTERNAL_JSDOC_MODE: JsdocMode = 'antfu'
