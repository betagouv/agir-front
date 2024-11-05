<template>
  <h2 class="fr-h3">{{ titre }}</h2>
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
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';

  defineProps<{
    titre: string;
    servicesRechercheFavorisViewModel: SuggestionServiceViewModel[];
  }>();
</script>
