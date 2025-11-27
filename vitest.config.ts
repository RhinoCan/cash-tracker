import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

// Use the Vitest defineConfig directly.
export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true, // allow describe/test/expect without imports in tests
    environment: 'jsdom', // simulate browser environment
    include: ['tests/**/*.spec.ts', 'tests/**/*.spec.js'], // test file patterns
    setupFiles: [], // optional: can add setup files if needed
    clearMocks: true, // auto-clear mocks between tests
    restoreMocks: true,
    coverage: {
      reporter: ['text', 'html'], // optional coverage reporting
    },
  },
})