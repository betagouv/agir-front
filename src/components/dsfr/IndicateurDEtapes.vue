<template>
  <div class="fr-stepper">
    <h2 class="fr-stepper__title">
      <span class="fr-stepper__state">Étape {{ etapeCourante }} sur {{ etapeTotal }}</span>
      {{ titreEtape }}
    </h2>
    <div class="fr-stepper__steps" :data-fr-current-step="etapeCourante" :data-fr-steps="etapeTotal"></div>
    <p class="fr-stepper__details"><span class="fr-text--bold">Étape suivante :</span> {{ titreEtapeSuivante }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titreEtape: string;
    titreEtapeSuivante: string;
    etapeCourante: number;
    etapeTotal: number;
  }>();
</script>
