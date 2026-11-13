import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.REPL_ID || process.env.REPLIT_DOMAINS || process.env.VITE_BASE_ROOT === '1' ? '/' : '/mvp-3/',
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
