<template>
  <div class="thematique-card border-radius--md shadow background--white fr-p-1w">
    <img class="border-radius--md full-width img-object-fit-cover" height="80" :src="urlImage" alt="" />
    <BarreDeProgression :value="100" :value-max="100" label="Thématique terminé" couleur="#000091" />
    <h2 class="fr-text--md text--semi-bold text--black fr-mb-1v text--lh-1-3">
      {{ titre }}
    </h2>
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';

  defineProps<{
    urlImage: string;
    titre: string;
  }>();
</script>

<style scoped>
  .thematique-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
</style>
