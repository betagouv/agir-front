<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <slot />
    </div>
    <div class="fr-col-12 fr-col-md-4">
      <ServiceAside :service-footer-view-model="aside" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import { AsideServiceViewModel } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';

  defineProps<{ aside: AsideServiceViewModel }>();
</script>
