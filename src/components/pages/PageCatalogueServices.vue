<template>
  <div class="fr-container">
    <div v-if="!serviceCatalogueViewModels">Une erreur est survenue</div>
    <CatalogueServices
      v-else
      @refresh-catalogue-services="refreshCatalogueServices"
      :service-catalogue-view-models="serviceCatalogueViewModels"
    />
  </div>
  <Teleport to="body">
    <Modale
      label="Modale de paramétrage du service Linky"
      id="linky"
      :radius="false"
      :is-footer-actions="false"
      size="m"
    >
      <template v-slot:contenu>
        <ServiceModaleParametreLinky service-id="linky" />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linky">
      Modale paramétrage du service linky
    </button>
  </Teleport>
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
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ServiceModaleParametreLinky from '@/components/custom/Linky/ServiceModaleParametreLinky.vue';

  const utilisateurId: string = utilisateurStore().utilisateur.id;
  const isLoading = ref<boolean>(true);

  const serviceCatalogueViewModels = ref<ServiceCatalogueViewModel>();
  function mapServiceCatalogueViewModel(services: ServiceCatalogueViewModel) {
    serviceCatalogueViewModels.value = services;
    isLoading.value = false;
  }
  const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryAxios());
  const serviceCataloguePresenterImpl = new ServiceCataloguePresenterImpl(mapServiceCatalogueViewModel);

  function refreshCatalogueServices() {
    usecase.execute(utilisateurId, serviceCataloguePresenterImpl);
  }
  onMounted(() => {
    refreshCatalogueServices();
  });
</script>
