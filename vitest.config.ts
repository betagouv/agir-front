/// <reference types="vitest" />

import { mergeConfig } from 'vitest/config';
import { viteConfig } from './vite.config';

export default mergeConfig(viteConfig, {
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/*/*.spec.ts'],
    exclude: ['tests/e2e/*.spec.ts'],
    sequence: { shuffle: true },
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
