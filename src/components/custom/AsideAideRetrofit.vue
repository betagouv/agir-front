<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Données utilisées pour l’estimation
    </p>
    <ul>
      <li>Code postal: {{ codePostal }}</li>
      <li>Revenu fiscal de référence : {{ revenuFiscal }}</li>
    </ul>
    <button
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right text--black-light"
      @click="resetSimulationAides"
    >
      Modifier ces données
    </button>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';

  defineProps<{
    codePostal: string;
    revenuFiscal: string;
  }>();

  const emit = defineEmits(['reset-simulation']);
  const resetSimulationAides = () => emit('reset-simulation');
</script>

<style scoped>
  button {
    background: none;
    text-decoration: underline;
  }

  button:hover {
    background: none;
  }
</style>
