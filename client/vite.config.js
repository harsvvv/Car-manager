import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',  // Proxying API requests to backend
        secure: false,
      },
    },
    historyApiFallback: true,  // This ensures the React Router handles all routes
  },
  plugins: [react()],
})
