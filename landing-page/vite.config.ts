import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { pageHead } from './build/pageHead.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pageHead()],
  build: {
    rollupOptions: {
      // One HTML entry per page. Paths must match `pages` in src/content/site.ts.
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy/index.html'),
      },
    },
  },
})
