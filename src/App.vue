<script setup lang="ts">
  import { computed } from 'vue';
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import Services from '@/components/custom/Services.vue';
  import Footer from '@/components/dsfr/Footer.vue';
  import Header from '@/components/dsfr/Header.vue';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';

  const utilisateurConnecte = computed(() => {
    return utilisateurStore().utilisateur.id.length > 0;
  });

  const appName = 'Agir ! -';
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { title, estPublique } = to.meta;

    if (title) {
      document.title = `${appName} ${title as string}`;
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
    <div class="print-hidden">
      <Header />
    </div>
    <main id="contenu" class="background--gris">
      <Services v-if="utilisateurConnecte" />
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
