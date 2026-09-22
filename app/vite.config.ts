import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://alliethu.github.io/path-app/ on GitHub Pages, so
  // asset URLs need the repo name as a base path.
  base: '/path-app/',
  plugins: [react(), tailwindcss()],
})
