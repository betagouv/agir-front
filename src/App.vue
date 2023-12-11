<script setup lang="ts">
  import Header from '@/components/dsfr/Header.vue';
  import Footer from '@/components/dsfr/Footer.vue';
  import { computed } from 'vue';
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import Services from '@/components/custom/Services.vue';

  const utilisateurConnecte = computed(() => {
    return utilisateurStore().utilisateur.id.length > 0;
  });

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { title, estPublique } = to.meta;
    window.scrollTo(0, 0);

    if (title) {
      document.title = title as string;
    }
    if (estPublique || utilisateurStore().utilisateur.id.length > 0) {
      next();
    } else {
      next({ name: 'authentification' });
      sessionStorage.setItem('requestedRoute', to.fullPath);
    }
  });
</script>

<template>
  <div class="page-container">
    <Header />
    <main class="background--gris">
      <Services
        v-if="utilisateurConnecte && utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes('services')"
      />
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
  .page-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
