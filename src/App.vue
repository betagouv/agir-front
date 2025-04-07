<template>
  <div class="page-container">
    <div class="print-hidden">
      <Header />
      <DisclaimerGeneral
        v-if="afficherLeDisclaimer"
        :onClick="
          () => {
            utilisateurStore().disclaimer.afficherDisclaimerGeneral = false;
          }
        "
        description="Cette version est encore très incomplète et de nombreuses évolutions et nouvelles fonctionnalités sont mises en ligne chaque semaine. N'hésitez pas à nous communiquer vos commentaires pour améliorer l'expérience."
        titre="J'agis est un nouveau service !"
      />
    </div>

    <main id="contenu" class="background--main" role="main">
      <router-view />
    </main>

    <Footer class="print-hidden" />
    <p v-if="!estEnvDeProduction">Version : {{ appVersion }}</p>
  </div>
</template>

<script lang="ts" setup>
  import axios from 'redaxios';
  import { computed, onMounted, ref } from 'vue';
  import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
  import DisclaimerGeneral from '@/components/dsfr/DisclaimerGeneral.vue';
  import Footer from '@/components/dsfr/Footer.vue';
  import Header from '@/components/dsfr/Header.vue';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const estEnvDeProduction = import.meta.env.VITE_ENV === 'production';

  const appName = "- J'agis";
  // eslint-disable-next-line no-undef
  const appVersion = __APP_VERSION__;
  const latestVersion = ref(appVersion);

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

  const checkVersion = async () => {
    if (import.meta.env.DEV) return;
    try {
      const response = await axios.get('/version.json', {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      });
      latestVersion.value = response.data.version;

      if (latestVersion.value !== appVersion) {
        window.location.reload();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erreur lors de la récupération de la version :', error);
    }
  };

  onMounted(() => {
    checkVersion();
  });
</script>

<style scoped>
  .page-container {
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
  }
</style>
