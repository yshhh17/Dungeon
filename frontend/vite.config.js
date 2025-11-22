import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Listen on all interfaces to accept connections from Docker host
    host: '0.0.0.0',
    port: 5173,
    watch: {
      // Use polling for file watching in Docker containers
      // This is necessary because native file watching doesn't work well with Docker volumes
      usePolling: true,
    },
  },
})
