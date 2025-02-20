<template>
  <section class="fr-container fr-my-3w">
    <h1 class="fr-h1">Toutes <span class="text--bold">les actions</span></h1>
    <div v-if="catalogueViewModel" class="fr-grid-row fr-grid-row--gutters">
      <CatalogueActionsComposant :catalogue-view-model="catalogueViewModel" />
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/pages/CatalogueActionsComposant.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const catalogueViewModel = ref<CatalogueActionsViewModel>();
  onMounted(() => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    usecase.execute(
      idUtilisateur,
      new CatalogueActionsPresenterImpl(actions => {
        catalogueViewModel.value = actions;
      }),
    );
  });
</script>

<style scoped>
  h1.fr-h1 {
    font-weight: 400;
  }
</style>
