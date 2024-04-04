<template>
  <div class="fr-container">
    <FilDAriane page-courante="Services" />
    <h1 class="fr-h2">Liste des services</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <CatalogueDeServices
      v-else-if="serviceCatalogueViewModels"
      :service-catalogue-view-models="serviceCatalogueViewModels"
      @update:est-installe="updateServiceEstInstalle"
    />
    <p v-else>Une erreur est survenue</p>
  </div>
  <Teleport to="body">
    <Modale
      label="Modale de paramétrage du service Linky"
      id="linkyModale"
      :radius="false"
      :is-footer-actions="false"
      size="m"
    >
      <template v-slot:contenu>
        <ServiceModaleParametreLinky service-id="linky" prm="" />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linkyModale">
      Modale paramétrage du service linky
    </button>
  </Teleport>
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
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ServiceModaleParametreLinky from '@/components/custom/Linky/ServiceModaleParametreLinky.vue';

  const isLoading = ref<boolean>(true);
  const serviceCatalogueViewModels = ref<ServiceCatalogueViewModel>();

  const updateServiceEstInstalle = (service: ServiceCatalogueViewModelItem) => {
    if (!serviceCatalogueViewModels.value) return;

    const index = serviceCatalogueViewModels.value.catalogue.findIndex(({ id }) => id === service.id);
    serviceCatalogueViewModels.value.catalogue[index].estInstalle = service.estInstalle;
    serviceCatalogueViewModels.value = { ...serviceCatalogueViewModels.value };
  };

  function afficherCatalogueService(viewModel: ServiceCatalogueViewModel) {
    serviceCatalogueViewModels.value = viewModel;
    setTimeout(() => {
      const anchor = window.location.hash;
      if (anchor) {
        const cleanAnchor = anchor.replace(/^#/, '');
        const anchorElement = document.getElementById(cleanAnchor);
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 1);
  }

  onMounted(async () => {
    const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryAxios());
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const serviceCataloguePresenterImpl = new ServiceCataloguePresenterImpl((services: ServiceCatalogueViewModel) =>
      afficherCatalogueService(services),
    );
    await usecase.execute(utilisateurId, serviceCataloguePresenterImpl);
    isLoading.value = false;
  });
</script>
