<template>
  <section class="fr-container fr-my-3w">
    <h1 class="fr-h1 fr-mt-4w fr-mb-4w">Actions</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div v-if="filtresViewModel" class="fr-col-md-8 fr-col-12">
        <h2 class="fr-h4">{{ filtresViewModel.phraseNombreActions }}</h2>

        <CatalogueActionsComposant
          v-if="actionsViewModel"
          :actions="actionsViewModel"
          card-classes="fr-col-12 fr-col-md-6"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsWinterUsecase } from '@/domaines/actions/recupererCatalogueActionsWinter.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(false);

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const actionsViewModel = ref<ActionViewModel[]>();
  const filtresViewModel = ref<FiltresCatalogueActionsViewModel>();
  const catalogueActionsPresenter = new CatalogueActionsPresenterImpl(
    filtres => {
      filtresViewModel.value = filtres;
    },
    actions => {
      actionsViewModel.value = actions;
    },
  );

  onMounted(async () => {
    isLoading.value = true;
    const usecase = new RecupererCatalogueActionsWinterUsecase(new ActionsRepositoryAxios());
    await usecase.execute(idUtilisateur, catalogueActionsPresenter);
    isLoading.value = false;
  });
</script>
