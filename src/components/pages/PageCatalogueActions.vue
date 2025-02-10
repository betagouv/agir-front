<template>
  <section class="fr-container fr-my-3w">
    <h1 class="fr-h1">Toutes <span class="text--bold">les actions</span></h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div v-for="action in catalogueViewModel?.actions" class="fr-col-12 fr-col-md-6 fr-col-lg-3" :key="action.code">
        <router-link
          class="background--white shadow border-radius--md fr-p-3w display-block background--none full-height"
          :to="action.url"
        >
          <p class="fr-text--xl text--bold fr-mb-1w" v-html="action.titre" />
          <ul class="list-style-none fr-p-0">
            <li v-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line">
              <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes"></span>
            </li>
            <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line">
              <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles.nombreDaidesDisponibles"></span>
            </li>
          </ul>
        </router-link>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
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

<style scoped>
  h1.fr-h1 {
    font-weight: 400;
  }
</style>
