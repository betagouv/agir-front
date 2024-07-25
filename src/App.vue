<script setup lang="ts">
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import Footer from '@/components/dsfr/Footer.vue';
  import Header from '@/components/dsfr/Header.vue';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { utilisateurStore } from '@/store/utilisateur';

  const appName = 'Agir ! -';
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { title, estPublique } = to.meta;

    if (title) {
      document.title = `${appName} ${title as string}`;
    }
    const estConnecte = utilisateurStore().utilisateur.id.length > 0;
    const onboardingTermine = utilisateurStore().utilisateur.onboardingAEteRealise;
    if (estPublique) {
      next();
    } else if (estConnecte && !onboardingTermine) {
      next({ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_1 });
    } else if (estConnecte && onboardingTermine) {
      next();
    } else {
      next({ name: 'authentification' });
      sessionStorage.setItem('requestedRoute', to.fullPath);
    }
  });
</script>

<template>
  <div class="page-container">
    <div class="print-hidden">
      <Header />
    </div>
    <main id="contenu" class="background--gris">
      <router-view />
    </main>

    <Footer class="print-hidden" />
  </div>
</template>

<style scoped>
  .page-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
