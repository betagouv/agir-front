<template>
  <h2>{{ titre }}</h2>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-4w list-style-none">
    <li
      v-for="(serviceRechercheFavorisViewModel, index) in servicesRechercheFavorisViewModel"
      :key="index"
      class="fr-col-md-3 fr-col-7"
    >
      <ServiceFavorisCarte :services-recherche-favoris="serviceRechercheFavorisViewModel" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ServiceFavorisCarte from '@/components/custom/Service/ServiceFavorisCarte.vue';

  defineProps<{
    titre: string;
    servicesRechercheFavorisViewModel: {
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
