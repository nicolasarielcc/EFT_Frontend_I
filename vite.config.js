import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = nombre del repositorio para que los assets funcionen en GitHub Pages
export default defineConfig({
  plugins: [react()],
  base: '/EFT_Frontend_I/',
})