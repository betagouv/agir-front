<template>
  <div class="fr-container">
    <FilDAriane page-courante="Services" />
    <h1 class="fr-h2">Liste des services</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <ServiceCatalogue
      v-else-if="serviceCatalogueViewModels"
      :service-catalogue-view-models="serviceCatalogueViewModels"
    />
    <p v-else>Une erreur est survenue</p>
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
  import { onMounted, ref } from 'vue';
  import { RecupererCatalogueServicesUseCase } from '@/services/recupererCatalogueServices.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import {
    ServiceCataloguePresenterImpl,
    ServiceCatalogueViewModel,
  } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import ServiceCatalogue from '@/components/custom/Service/ServiceCatalogue.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ServiceModaleParametreLinky from '@/components/custom/Linky/ServiceModaleParametreLinky.vue';

  const isLoading = ref<boolean>(true);
  const serviceCatalogueViewModels = ref<ServiceCatalogueViewModel>();

  onMounted(async () => {
    const usecase = new RecupererCatalogueServicesUseCase(new ServiceRepositoryAxios());
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const serviceCataloguePresenterImpl = new ServiceCataloguePresenterImpl(
      (services: ServiceCatalogueViewModel) => (serviceCatalogueViewModels.value = services)
    );
    await usecase.execute(utilisateurId, serviceCataloguePresenterImpl);
    isLoading.value = false;
  });
</script>
