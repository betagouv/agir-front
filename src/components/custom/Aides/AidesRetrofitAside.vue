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
    <router-link
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right text--black-light"
      :to="{ name: 'mon-compte' }"
    >
      Modifier ces données
    </router-link>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';

  defineProps<{
    codePostal: string;
    revenuFiscal: string;
  }>();
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
