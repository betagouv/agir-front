<template>
  <div class="flex flex-column fr-mb-2w">
    <button
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
      @click="onClickRevenirEtapePrecedente"
    >
      Retour
    </button>
    <span class="text--bleu">
      <span class="fr-text--bold">Étape {{ etapeActuelle }}</span> sur {{ etapeTotale }} - {{ titre }}
    </span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string;
    etapeTotale: number;
    etapeActuelle: number;
    onClickRevenirEtapePrecedente: () => void;
  }>();
</script>
