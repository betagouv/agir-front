<template>
  <div class="fr-container">
    <FilDAriane page-courante="Services" />
    <h1 class="fr-h2">Liste des services</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <CatalogueDeServices
      v-else-if="serviceCatalogueViewModels"
      :service-catalogue-view-models="serviceCatalogueViewModels"
      :utilisateur-id="utilisateurStore().utilisateur.id"
      @update:est-installe="updateServiceEstInstalle"
    />
    <p v-else>Une erreur est survenue</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { RecupererCatalogueServicesUseCase } from '@/services/recupererCatalogueServices.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import {
    ServiceCataloguePresenterImpl,
    ServiceCatalogueViewModel,
    ServiceCatalogueViewModelItem,
  } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import CatalogueDeServices from '@/components/custom/CatalogueDeServices/CatalogueDeServices.vue';

  const isLoading = ref<boolean>(true);
  const serviceCatalogueViewModels = ref<ServiceCatalogueViewModel>();

  const updateServiceEstInstalle = (service: ServiceCatalogueViewModelItem) => {
    if (!serviceCatalogueViewModels.value) return;

    const index = serviceCatalogueViewModels.value.catalogue.findIndex(({ id }) => id === service.id);
    serviceCatalogueViewModels.value.catalogue[index].estInstalle = service.estInstalle;
    serviceCatalogueViewModels.value = { ...serviceCatalogueViewModels.value };
  };

  onMounted(async () => {
    const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryAxios());
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const serviceCataloguePresenterImpl = new ServiceCataloguePresenterImpl(
      (services: ServiceCatalogueViewModel) => (serviceCatalogueViewModels.value = services),
    );
    await usecase.execute(utilisateurId, serviceCataloguePresenterImpl);
    isLoading.value = false;
  });
</script>
