import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export const viteConfig = {
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    headers: {
      'Content-Security-Policy': `style-src 'nonce-random' 'self'; default-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self'; connect-src 'self'; object-src 'self'; media-src 'self'; frame-src 'self' https://www.youtube.com`,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
export default defineConfig(viteConfig);
