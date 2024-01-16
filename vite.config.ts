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
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          aides: ['./src/components/pages/PageAides.vue'],
          services: ['./src/components/pages/PageCatalogueServices.vue'],
          quiz: ['./src/components/pages/PageQuiz.vue'],
          compte: ['./src/components/pages/PageCompte.vue'],
          onboarding: ['./src/components/pages/PagePreOnboarding.vue', './src/components/pages/PageOnboarding.vue'],
          accueil: ['./src/components/pages/PageAccueil.vue'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
};
export default defineConfig(viteConfig);
