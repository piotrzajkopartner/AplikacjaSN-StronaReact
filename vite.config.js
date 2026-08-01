import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        demo: resolve(import.meta.dirname, 'demo.html'),
        privacy: resolve(import.meta.dirname, 'polityka-prywatnosci.html'),
        notFound: resolve(import.meta.dirname, '404.html'),
      },
    },
  },
})
