<template>
  <div class="fr-p-2w background--white border border-radius--md">
    <div class="fr-grid-row fr-col-12">
      <div class="fr-hidden fr-unhidden-md fr-mr-1w">
        <img class="img-icon-rounded" :src="icon" alt="" width="70" height="70" />
      </div>
      <div class="fr-grid-row flex-space-between flex-column fr-ml-1w fr-ml-md-0">
        <div class="fr-mb-1v fr-m-md-0">
          <span v-for="thematique in thematiques" :key="thematique" class="fr-mr-1w fr-text--bold text--xs text--lh-0">
            {{ thematique }}
          </span>
        </div>
        <h2 class="fr-mb-1v fr-m-md-0 fr-text--bold fr-text--xl text--lh-1">{{ titre }}</h2>
        <span class="fr-m-md-0 fr-text--xs fr-text-mention--grey fr-icon-group-line fr-icon--xs">
          {{ nombreInstallation }}
        </span>
      </div>
      <div class="fr-grid-row--top fr-ml-auto">
        <span v-if="estEnConstruction" class="fr-badge fr-badge--info">SERVICE BIENTÔT DISPONIBLE</span>
        <button
          v-else-if="estInstalleState"
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-close-line fr-btn--sm"
          @click="enleverServiceActif(id)"
        >
          Enlever
        </button>
        <button
          v-else
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-download-line fr-btn--sm"
          @click="installerServiceActif(id)"
        >
          Installer
        </button>
      </div>
    </div>
    <div class="fr-grid-row fr-grid-row--gutters fr-mt-2w">
      <div class="fr-col-6">
        <img class="img-illustration" :src="image" alt="" />
      </div>
      <div class="fr-col-6">
        <h3 class="fr-text--bold fr-text--md text--gris">{{ description }}</h3>
        <p>{{ sousDescription }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ServiceEventBusImpl } from '@/services/serviceEventBusImpl';
  import { EnleverServiceActifUsecase } from '@/services/enleverServiceActif.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { InstallerServiceActifUsecase } from '@/services/installerServiceActif.usecase';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';

  const props = defineProps<{
    id: string;
    icon: string;
    image: string;
    thematiques: string[];
    estEnConstruction: boolean;
    estInstalle: boolean;
    titre: string;
    nombreInstallation: string;
    description: string;
    sousDescription: string;
  }>();

  const estInstalleState = ref<boolean>(props.estInstalle);

  async function enleverServiceActif(serviceId: string) {
    const useCase = new EnleverServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    estInstalleState.value = false;
  }

  async function installerServiceActif(serviceId: string) {
    const useCase = new InstallerServiceActifUsecase(new ServiceRepositoryAxios(), ServiceEventBusImpl.getInstance());
    const utilisateurId = utilisateurStore().utilisateur.id;
    await useCase.execute(utilisateurId, serviceId);
    estInstalleState.value = true;
    window.scrollTo(0, 0);

    if (serviceId === 'linky') {
      const modaleActions = new ModaleActions(serviceId);
      modaleActions.open();
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
