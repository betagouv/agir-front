<template>
  <div class="fr-container" v-if="serviceRechercheViewModel">
    <FilDAriane
      :page-courante="`Service : ${serviceRechercheViewModel.titre}`"
      :page-hierarchie="[{ label: 'Vos services', url: RouteCoachName.SERVICES }]"
    />
    <h1 class="fr-h2">{{ serviceRechercheViewModel.titre }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <section v-if="serviceRechercheViewModel.carousel">
          <ServiceCarousel :carousel-service-view-model="serviceRechercheViewModel.carousel" />
        </section>
        <section v-if="serviceRechercheViewModel.suggestions" class="fr-py-6w">
          <ServiceListeCarte :suggestions-service-view-model="serviceRechercheViewModel.suggestions" />
        </section>
      </div>
      <div class="fr-col-12 fr-col-md-4">
        <ServiceAside :service-footer-view-model="serviceRechercheViewModel.aside" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import ServiceCarousel from '@/components/custom/Service/ServiceCarousel.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRecherchePresenterImpl,
    ServiceRechercheViewModel,
  } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';
  import { ServiceRechercheAxios } from '@/domaines/serviceRecherche/adapters/serviceRecherche.repository.axios';
  import { RecupererServiceRechercheUsecase } from '@/domaines/serviceRecherche/recupererServiceRecherche.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceRechercheViewModel = ref<ServiceRechercheViewModel>();
  const usecase = new RecupererServiceRechercheUsecase(new ServiceRechercheAxios());
  usecase.execute(
    utilisateurStore().utilisateur.id,
    'proximite',
    new ServiceRecherchePresenterImpl(vm => (serviceRechercheViewModel.value = vm)),
  );
</script>
