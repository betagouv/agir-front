<template>
  <div class="fr-pt-4w fr-pb-1w background-bleu-975-25">
    <div class="fr-container text--center">
      <h2 class="fr-h2">Par où souhaitez-vous commencer ?</h2>
      <p>
        D’après nos calculs, à <span class="text--bold text--bleu text--italic">Tarascon</span>, voici ce que nous
        pouvons vous proposer :
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { utilisateurStore } from '@/store/utilisateur';

  const usecase = new RecupererSyntheseThematiques(utilisateurStore().utilisateur.id);
</script>

<style scoped>
  .background-bleu-975-25 {
    background-color: var(--blue-france-975-75);
  }
</style>
