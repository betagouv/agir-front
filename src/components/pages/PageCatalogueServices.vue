<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!serviceCatalogueViewModels">Une erreur est survenue</div>
    <CatalogueServices v-else :service-catalogue-view-models="serviceCatalogueViewModels" />
  </div>
</template>

<script setup lang="ts">
  import { RecupererCatalogueServicesUseCase } from '@/services/recupererCatalogueServices.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import {
    ServiceCataloguePresenterImpl,
    ServiceCatalogueViewModel,
  } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import { onMounted, ref } from 'vue';
  import CatalogueServices from '@/components/custom/CatalogueServices.vue';

  const utilisateurId: string = utilisateurStore().utilisateur.id;
  const isLoading = ref<boolean>(true);

  const serviceCatalogueViewModels = ref<ServiceCatalogueViewModel[]>();
  function mapServiceCatalogueViewModel(services: ServiceCatalogueViewModel[]) {
    serviceCatalogueViewModels.value = services;
    isLoading.value = false;
  }

  onMounted(() => {
    const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryAxios());
    usecase.execute(utilisateurId, new ServiceCataloguePresenterImpl(mapServiceCatalogueViewModel));
  });
</script>
