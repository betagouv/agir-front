<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-py-4w">
    <div class="fr-col-12 fr-col-md-9">
      <slot />
    </div>
    <div class="fr-col-12 fr-col-md-3">
      <ServiceAside
        :nom="aside.nom"
        :image="aside.screenshot"
        :description="aside.description"
        :url-label="aside.urlLabel"
        :url="aside.url"
        :logo="aside.logo"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/suggestionServiceViewModel';

  defineProps<{ aside: ServiceRechercheViewModelBase['aside'] }>();
</script>
