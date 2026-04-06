import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Route each prefix to the real service port. Do NOT send everything to the gateway:
    // when Eureka/gateway is misconfigured, /api/auth/* returns 404 from :8080.
    proxy: {
      '/api/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
      '/api/customers': {
        target: 'http://localhost:8082',
        changeOrigin: true,
      },
      '/api/tickets': {
        target: 'http://localhost:8083',
        changeOrigin: true,
      },
      '/api/notifications': {
        target: 'http://localhost:8084',
        changeOrigin: true,
      },
    },
  },
})
