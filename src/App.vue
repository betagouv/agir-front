<script setup lang="ts">
  import PageHeader from '@/components/PageHeader.vue';
  import Footer from '@/components/dsfr/Footer.vue';
  import { computed } from 'vue';
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  const afficherLeHeaderEtFooter = computed({
    get() {
      return true;
    },
    set() {},
  });

  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { title, estPublique } = to.meta;
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
    <PageHeader v-if="afficherLeHeaderEtFooter" />

    <main class="background--gris fr-py-6w">
      <router-view />
    </main>

    <Footer v-if="afficherLeHeaderEtFooter" />
  </div>
</template>

<style scoped>
  .page-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
