<template>
  <div class="fr-stepper">
    <h1 class="fr-stepper__title">
      {{ titre }}
      <span class="fr-stepper__state">
        <span class="fr-text--bold"> Étape {{ etapeActuelle }} sur {{ etapeTotale }}</span>
      </span>
    </h1>
    <div :data-fr-current-step="etapeActuelle" :data-fr-steps="etapeTotale" class="fr-stepper__steps fr-mb-1w"></div>
    <p v-if="prochaineEtape" class="fr-stepper__details">
      <span class="fr-text--bold">Étape suivante :</span> {{ prochaineEtape }}
    </p>
    <button
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
      @click="fonctionRetour"
    >
      Retour
    </button>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    titre: string;
    etapeActuelle: number;
    etapeTotale: number;
    fonctionRetour: () => void;
    prochaineEtape?: string;
  }>();
</script>
