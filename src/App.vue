<template>
  <div class="page-container">
    <div class="print-hidden">
      <Header />
      <DisclaimerGeneral
        v-if="afficherLeDisclaimer"
        titre="J'agis est en construction !"
        description="Cette version est encore très incomplète et de nombreuses évolutions et nouvelles fonctionnalités sont mises en ligne chaque semaine. N'hésitez pas à nous communiquer vos commentaires pour améliorer l'expérience."
        :onClick="
          () => {
            utilisateurStore().disclaimer.afficherDisclaimerGeneral = false;
          }
        "
      />
    </div>
    <main id="contenu" class="background--main">
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
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const appName = "- J'agis";
  router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const { title, estPublique } = to.meta;

    if (title) {
      document.title = `${title as string} ${appName}`;
    }

    const navigationStore = useNavigationStore();
    if (from.fullPath) {
      navigationStore.addRoute(from.fullPath, from.name as string);
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
