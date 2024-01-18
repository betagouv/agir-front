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
        manualChunks: {
          components: [
            './src/components/custom/BoutonRadio.vue',
            './src/components/custom/InputNumberHorizontal.vue',
            './src/components/custom/CarteExplication.vue',
          ],
          shell: [
            './src/shell/repositoryError.ts',
            './src/shell/ports/publierEvenement.repository.ts',
            './src/shell/adapters/publierEvenemnt.repository.axios.ts',
            './src/shell/publierEvenementHotjar.ts',
            './src/router/index.ts',
            './src/shell/calculerCouleurJauge.ts',
            './src/shell/calculerSeuils.ts',
            './public/logo.svg',
          ],
          stores: [
            './src/store/interaction.ts',
            './src/store/onboarding.ts',
            './src/store/onboardingBilan.ts',
            './src/store/utilisateur.ts',
          ],
          accueil: ['./src/components/pages/PageAccueil.vue'],
          onboarding: [
            './src/components/pages/PagePreOnboarding.vue',
            './src/components/pages/PageOnboarding.vue',
            './src/components/pages/PageBilanOnboarding.vue',
            './src/components/custom/Onboarding/AsideOnboardingEtapeAlimentation.vue',
            './src/components/custom/Onboarding/AsideOnboardingEtapeConsommation.vue',
            './src/components/custom/Onboarding/AsideOnboardingEtapeLogement.vue',
            './src/components/custom/Onboarding/AsideOnboardingEtapeTransport.vue',
            './src/components/custom/Onboarding/OnboardingEtapeAlimentation.vue',
            './src/components/custom/Onboarding/OnboardingEtapeConsommation.vue',
            './src/components/custom/Onboarding/OnboardingEtapeTransport.vue',
            './src/components/custom/Onboarding/OnboardingJauge.vue',
          ],
        },
      },
    },
  },
};
export default defineConfig(viteConfig);
