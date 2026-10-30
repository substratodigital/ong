import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mvp-2/',
  publicDir: 'public',
  cacheDir: '.vite-cache',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    host: '127.0.0.1',
    port: 5179,
    strictPort: true
  }
});
