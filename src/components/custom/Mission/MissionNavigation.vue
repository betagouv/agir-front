<template>
  <div class="flex flex-column">
    <div class="fr-stepper fr-mb-2w">
      <h1 class="fr-stepper__title">
        {{ titre }}
        <span class="fr-stepper__state">
          <span class="fr-text--bold"> Étape {{ etapeActuelle }} sur {{ etapeTotale }}</span>
        </span>
      </h1>
      <div class="fr-stepper__steps fr-mb-1w" :data-fr-current-step="etapeActuelle" :data-fr-steps="etapeTotale"></div>
      <button
        class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
        @click="onClickRevenirEtapePrecedente"
      >
        Retour
      </button>
    </div>
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
