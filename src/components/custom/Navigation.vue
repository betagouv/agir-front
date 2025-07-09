<template>
  <div class="fr-grid-row align-items--center text--bleu">
    <button
      v-if="etapeActuelle > 1"
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-px-1w fr-mr-1v"
      @click="onClickRevenirEtapePrecedente"
    >
      Retour
    </button>
    <span class="fr-py-1w fr-pl-1v" ref="indicateurNavigationRef" tabindex="-1">
      Question <span class="fr-text--bold">{{ etapeActuelle }} sur {{ etapeTotale }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  defineProps<{
    etapeTotale: number;
    etapeActuelle: number;
    onClickRevenirEtapePrecedente: () => void;
  }>();

  const indicateurNavigationRef = ref<HTMLSpanElement>();

  defineExpose({
    focus: () => indicateurNavigationRef.value?.focus(),
  });
</script>
