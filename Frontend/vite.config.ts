import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    port: 5175,
    allowedHosts: ['8acd-2001-2044-1517-1000-cd63-a279-cc7d-7b0d.ngrok-free.app']
  }
})
