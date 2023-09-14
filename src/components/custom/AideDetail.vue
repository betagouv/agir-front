<template>
  <div class="fr-grid-row fr-grid-row fr-grid-row--gutters">
    <img class="fr-col-2" :src="urlLogo" alt="">
    <div class="fr-col-8">
      <h4 class="fr-text--md fr-mb-1w">{{ titre }}</h4>
      <Badge :label="labelDuBadge" class="fr-mb-1w" />
      <p v-if="description" class="fr-my-2w">{{ description }}</p>
      <a :title="`Consultez ${titre} - ouvre une nouvelle fenêtre`" :href="urlExterne" target="_blank" rel="noopener">En savoir plus</a>
    </div>
    <span class="fr-col-2 fr-text--bold fr-text--md text--right">{{ valeurAide }} €</span>
  </div>
</template>

<script setup lang="ts">
  import Badge from '@/components/custom/Badge.vue';

  defineProps<{
    titre: string,
    labelDuBadge: string,
    description?: string,
    urlExterne: string,
    valeurAide: number,
    urlLogo: string
  }>();
</script>

<style scoped>
  img {
    width: 100%;
    object-fit: contain;
  }
</style>