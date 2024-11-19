import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/deepsearch': {
        target: 'https://api-v2.deepsearch.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/deepsearch/, ''),
      },
      '/api': {
        target: 'http://localhost:5001', // Express 서버
        changeOrigin: true,
      },
    },
  },
});
