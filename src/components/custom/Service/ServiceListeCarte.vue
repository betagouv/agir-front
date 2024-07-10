<template>
  <h2>Suggestions</h2>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
    <li v-for="suggestion in suggestionsServiceViewModel" :key="suggestion.titre" class="fr-col-12 fr-col-md-6">
      <ServiceCarte :suggestionsServiceViewModel="suggestion" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ServiceCarte from '@/components/custom/Service/ServiceCarte.vue';

  defineProps<{
    suggestionsServiceViewModel: {
      titre: string;
      img: string;
      description?: string;
      information?: string;
      nombreMiseEnFavoris: number;
      tag?: {
        label: string;
        style: string;
      };
    }[];
  }>();
</script>
