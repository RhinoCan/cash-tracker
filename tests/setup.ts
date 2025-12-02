import { vi } from 'vitest'

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock CSS imports
vi.mock('*.css', () => ({}))
vi.mock('*.scss', () => ({}))

// Suppress Vue warnings in tests
const originalWarn = console.warn
console.warn = (...args: any[]) => {
  // Suppress specific Vue/Vuetify warnings that don't affect test validity
  const msg = args[0]?.toString() || ''
  if (
    msg.includes('Could not parse CSS') ||
    msg.includes('App already provides property') ||
    msg.includes('[Vue warn]')
  ) {
    return
  }
  originalWarn(...args)
}