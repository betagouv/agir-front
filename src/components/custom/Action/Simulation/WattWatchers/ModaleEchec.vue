<template>
  <div class="fr-modal__content fr-mb-0">
    <div class="flex flex-center fr-mb-2w">
      <img alt="" class="margin-x-auto" src="/prise-non-fonctionnelle.svg" />
    </div>
    <h1 id="label-id" class="fr-modal__title">La connexion a échouée</h1>
    <p class="fr-mb-1w">Nous n’avons pas trouvé de compteur relié aux informations que nous vous avez données.</p>
  </div>
  <div class="fr-modal__footer fr-mt-0">
    <button class="fr-btn fr-btn--secondary full-width flex-center" @click="retour">Retour</button>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    modaleId: string;
    modifierNumero: () => void;
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
