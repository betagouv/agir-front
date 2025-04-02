import { sentryVitePlugin } from '@sentry/vite-plugin';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { defineConfig } from 'vite';
import { version } from './package.json';

// https://vitejs.dev/config/
export const viteConfig = {
  build: {
    sourcemap: true,
  },
  plugins: [
    vue(),
    ...(process.env.VITE_ENV === 'production'
      ? [
          sentryVitePlugin({
            authToken: process.env.SENTRY_AUTH_TOKEN,
            org: 'betagouv',
            project: 'front-dev',
            url: 'https://sentry.incubateur.net/',
          }),
        ]
      : []),
  ],
  server: {
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
};
export default defineConfig(viteConfig);
