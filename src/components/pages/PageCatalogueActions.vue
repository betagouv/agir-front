<template>
  <div class="fr-container">
    <h1>Toutes les <span class="text--semi-bold">actions</span></h1>
    {{ catalogueViewModel }}
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import {
    CatalogueActionsPresenterImpl,
    CatalogueActionsViewModel,
  } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';

  const catalogueViewModel = ref<CatalogueActionsViewModel>();
  onMounted(() => {
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    usecase.execute(
      new CatalogueActionsPresenterImpl(actions => {
        catalogueViewModel.value = actions;
      }),
    );
  });
</script>

<style scoped></style>
