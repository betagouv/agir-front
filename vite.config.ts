import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export const viteConfig = {
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
export default defineConfig(viteConfig);
