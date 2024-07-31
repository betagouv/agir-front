<template>
  <div class="page-container">
    <div class="print-hidden">
      <Header />
      <DisclaimerGeneral
        v-if="afficherLeDisclaimer"
        titre="Agir est encore en expérimentation !"
        description="Certains contenus et fonctionnalités seront mis à jour progressivement pour vous proposer la meilleure expérience. Revenez régulièrement pour profiter de nos dernières nouveautés."
        :onClick="
          () => {
            utilisateurStore().disclaimer.afficherDisclaimerGeneral = false;
          }
        "
      />
    </div>
    <main id="contenu" class="background--gris">
      <router-view />
    </main>

    <Footer class="print-hidden" />
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import DisclaimerGeneral from '@/components/dsfr/DisclaimerGeneral.vue';
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

  const afficherLeDisclaimer = computed(() => {
    return (
      utilisateurStore().utilisateur.onboardingAEteRealise && utilisateurStore().disclaimer.afficherDisclaimerGeneral
    );
  });
</script>

<style scoped>
  .page-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
