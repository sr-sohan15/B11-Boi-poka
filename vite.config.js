import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/B11-Boi-poka/',
  server: {
    watch: {
      usePolling: true, 
    },
  },
})