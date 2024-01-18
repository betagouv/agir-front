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
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks(id: string) {
          if (id.includes('/components/custom/') && !id.includes('/custom/Onboarding')) {
            return 'components';
          }

          if (id.includes('/shell/') || id.includes('/router/') || id.includes('/public/')) {
            return 'shell';
          }
          if (id.includes('/store/')) {
            return 'stores';
          }
          if (id.includes('/pages/PageAccueil.vue')) {
            return 'accueil';
          }
          if (
            id.includes('/pages/PagePreOnboarding.vue') ||
            id.includes('/pages/PageOnboarding.vue') ||
            id.includes('/pages/PageBilanOnboarding.vue') ||
            id.includes('/custom/Onboarding')
          ) {
            return 'onboarding';
          }
        },
      },
    },
  },
};
export default defineConfig(viteConfig);
