<template>
  <div class="fr-p-2w background--white border border-radius--md">
    <div class="fr-grid-row fr-col-12">
      <div class="fr-hidden fr-unhidden-md fr-mr-1w">
        <img class="img-icon-rounded" :src="service.icon" alt="" width="70" height="70" />
      </div>
      <div class="fr-grid-row flex-space-between flex-column fr-ml-1w fr-ml-md-0">
        <div class="fr-mb-1v fr-m-md-0">
          <span
            v-for="thematique in service.thematiques"
            :key="thematique"
            class="fr-mr-1w fr-text--bold text--xs text--lh-0"
          >
            {{ thematique }}
          </span>
        </div>
        <h2 class="fr-mb-1v fr-m-md-0 fr-text--bold fr-text--xl text--lh-1">{{ service.titre }}</h2>
        <span class="fr-m-md-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
          {{ service.nombreInstallation }}
        </span>
      </div>
      <div class="fr-grid-row--top fr-ml-auto">
        <span v-if="service.estEnConstruction" class="fr-badge fr-badge--info">SERVICE BIENTÔT DISPONIBLE</span>
        <button
          v-else-if="service.estInstalle"
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-close-line fr-btn--sm"
          @click="enleverServiceActif(service.id)"
        >
          Enlever
        </button>
        <button
          v-else
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-download-line fr-btn--sm"
          @click="installerServiceActif(service.id)"
        >
          Installer
        </button>
      </div>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters fr-mt-2w">
      <div class="fr-col-6">
        <img class="img-illustration" :src="service.image" alt="" />
      </div>
      <div class="fr-col-6">
        <h3 class="fr-text--bold fr-text--md text--gris">{{ service.description }}</h3>
        <p>{{ service.sousDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ServiceEventBusImpl } from '@/services/serviceEventBusImpl';
  import { EnleverServiceActifUsecase } from '@/services/enleverServiceActif.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { InstallerServiceActifUsecase } from '@/services/installerServiceActif.usecase';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import { ServiceCatalogueViewModelItem } from '@/services/adapters/serviceCatalogue.presenter.impl';
  import { MarquerLeServiceCommeConsulteUsecase } from '@/linky/marquerLeServiceCommeConsulte.usecase';
  import { LinkyRepositoryAxios } from '@/linky/adapters/linky.repository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const props = defineProps<{ service: ServiceCatalogueViewModelItem }>();

  const emit = defineEmits<{ (e: 'update:estInstalle', value: ServiceCatalogueViewModelItem): void }>();

  async function enleverServiceActif(serviceId: string) {
    const useCase = new EnleverServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    emit('update:estInstalle', { ...props.service, estInstalle: false });
  }

  async function installerServiceActif(serviceId: string) {
    const useCase = new InstallerServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    emit('update:estInstalle', { ...props.service, estInstalle: true });
    window.scrollTo(0, 0);

    if (serviceId === 'linky') {
      const modaleActions = new ModaleActions(serviceId);
      modaleActions.open();
      const marquerLeServiceCommeConsulteUsecase = new MarquerLeServiceCommeConsulteUsecase(
        new LinkyRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      );
      await marquerLeServiceCommeConsulteUsecase.execute(utilisateurStore().utilisateur.id);
    }
  }
</script>

<style scoped>
  .img-icon-rounded {
    display: block;
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(0, 0, 18, 0.16);
  }

  .img-illustration {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    max-height: 19rem;
  }
</style>
