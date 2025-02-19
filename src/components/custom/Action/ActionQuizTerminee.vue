<template>
  <div class="conteneur-drapeaux fr-my-2w">
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu big" aria-hidden="true" />
    <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
  </div>
  <h2 class="fr-mt-2w text--center">
    <span class="text--bold">Bravo !</span><br />
    <span class="text--bleu fr-text--lead text--normal">
      Vous avez terminé le quiz "<span class="fr-text--bold">{{ titre }}</span
      >" !
    </span>
  </h2>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
  }>();
</script>

<style scoped>
  .conteneur-drapeaux {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .fr-icon-flag-fill::before {
    --icon-size: 1.5rem;
  }

  .big::before {
    --icon-size: 3.5rem;
  }
</style>
