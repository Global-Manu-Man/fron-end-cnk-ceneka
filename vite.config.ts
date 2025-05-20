import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://cnk-ceneka.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cloudinary-api': {
        target: 'https://api.cloudinary.com/v1_1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cloudinary-api/, ''),
      },
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
