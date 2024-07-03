<template>
  <FilDAriane
    :page-courante="`Service : ${serviceRechercheViewModel.titre}`"
    :page-hierarchie="[{ label: 'Vos services', url: RouteCoachName.SERVICES }]"
  />
  <h1 class="fr-h2">{{ serviceRechercheViewModel.titre }}</h1>
  <select class="fr-select" id="categories" name="categories">
    <option
      v-for="categorie in serviceRechercheViewModel.categories"
      :key="categorie.code"
      :value="categorie.code"
      :selected="categorie.estLaCategorieParDefaut"
    >
      {{ categorie.label }}
    </option>
  </select>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <section v-if="serviceRechercheViewModel.favoris">
        <ServiceCarousel :services-recherche-favoris-view-model="serviceRechercheViewModel.favoris" />
      </section>
      <section v-if="serviceRechercheViewModel.suggestions" class="fr-py-6w">
        <ServiceListeCarte :suggestions-service-view-model="serviceRechercheViewModel.suggestions" />
      </section>
    </div>
    <div class="fr-col-12 fr-col-md-4">
      <ServiceAside :service-aside-view-model="serviceRechercheViewModel.aside" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import ServiceCarousel from '@/components/custom/Service/ServiceCarousel.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ServiceRechercheViewModel } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
  import { RouteCoachName } from '@/router/coach/routeCoachName';

  defineProps<{ serviceRechercheViewModel: ServiceRechercheViewModel }>();
</script>
