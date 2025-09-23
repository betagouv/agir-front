<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img alt="" class="margin-x-auto" src="/prise-fonctionnelle.svg" />
    </div>
    <h1 id="label-id" class="fr-modal__title">Connexion établie</h1>
    <p class="fr-mb-1w">
      La connexion a été établie avec succès. Dans le futur, pour modifier vos informations, rendez-vous dans
      <router-link
        :to="{ name: RouteCompteName.THEMATIQUE, params: { thematiqueId: ThematiqueURL.logement } }"
        class="fr-link"
        >votre profil.</router-link
      >
    </p>
  </div>
  <div class="fr-modal__footer fr-mt-0">
    <button class="fr-btn full-width flex-center" @click="passerEtapeSuivante">Continuer</button>
  </div>
</template>

<script lang="ts" setup>
  import { ThematiqueURL } from '@/domaines/thematiques/MenuThematiques';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  defineProps<{
    modaleId: string;
    passerEtapeSuivante: () => void;
  }>();
</script>

<style scoped>
  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }
</style>
