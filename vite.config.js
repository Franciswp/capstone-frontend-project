import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
        'https://capstone-microservice-backend.onrender.com'
    ],
    proxy: {
      '/api': {
        target: "https://capstone-microservice-backend.onrender.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // Set limit to 1000 kB (1 MB)
  },
})