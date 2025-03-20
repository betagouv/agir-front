<template>
  <div class="root fr-container flex flex-column flex-center fr-pt-10w fr-pb-16w">
    <h2 class="fr-h2 text--white text--center flex flex-column flex-center align-items--center">
      <CompteurDynamique :valeur="aidesNationalesRealisees ?? 0" />
      <span class="fr-mt-4w">Actions réalisées ensemble partout en France</span>
    </h2>
  </div>
</template>

<script setup lang="ts">
  import CompteurDynamique from '@/components/custom/AccueilConnectee/CompteurDynamique.vue';

  defineProps<{ aidesNationalesRealisees?: number }>();
</script>

<style scoped>
  .root {
    background-image: url('/mains-accueil-connecte.svg');
    background-repeat: no-repeat;
    background-position: bottom center;
  }
</style>
