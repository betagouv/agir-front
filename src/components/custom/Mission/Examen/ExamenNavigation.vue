<template>
  <div class="fr-grid-row align-items--center">
    <button
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
      @click="onClickRevenirEtapePrecedente"
    >
      Retour
    </button>
    <span class="fr-text--bold"> Question {{ etapeActuelle }} sur {{ etapeTotale }}</span>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    etapeTotale: number;
    etapeActuelle: number;
    onClickRevenirEtapePrecedente: () => void;
  }>();
</script>
