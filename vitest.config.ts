/// <reference types="vitest" />

import Vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
