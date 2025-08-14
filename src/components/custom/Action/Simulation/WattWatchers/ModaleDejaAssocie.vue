<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img alt="" class="margin-x-auto" src="/prise-non-fonctionnelle.svg" />
    </div>
    <h1 id="label-id" class="fr-modal__title">Compteur déjà associé</h1>
    <p class="fr-mb-1w">
      Oups, il nous semble qu’un autre utilisateur de J’agis ait déjà associé ce compteur à son compte...
      <span class="fr-text--bold">Vérifiez avec les personnes de votre foyer</span>, ou
      <a href="mailto:contact@jagis.beta.gouv.fr">contactez notre support</a>.
    </p>
  </div>
  <div class="fr-modal__footer fr-mt-0">
    <button class="fr-btn fr-btn--secondary full-width flex-center" @click="retour">Retour</button>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    modaleId: string;
    retour: () => void;
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
