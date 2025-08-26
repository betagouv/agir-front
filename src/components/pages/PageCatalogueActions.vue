<template>
  <section class="background-brown-opera-950 headerActions">
    <div class="fr-container">
      <h1 class="fr-h1 fr-mb-1w fr-pt-5w">Explorer toutes nos actions</h1>
      <p class="fr-text--xl fr-mb-5w">
        Et découvrez nos conseils, adresses et aides financières pour vous accompagner !
      </p>

      <CatalogueActionsBarreDeFiltres
        v-if="filtresViewModel"
        :catalogue-actions-presenter="catalogueActionsPresenter"
        :filtres-view-model="filtresViewModel"
      />
    </div>
  </section>

  <section class="fr-container fr-my-3w">
    <h2 v-if="filtresViewModel" class="fr-h4">{{ filtresViewModel.phraseNombreActions }} disponibles</h2>

    <CatalogueActionsComposant
      v-if="actionsViewModel"
      :actions="actionsViewModel"
      card-classes="fr-col-12 fr-col-md-3"
    />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import CatalogueActionsBarreDeFiltres from '@/components/pages/CatalogueActionsBarreDeFiltres.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

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
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(idUtilisateur, catalogueActionsPresenter);
  });
</script>

<style scoped>
  .background-brown-opera-950 {
    background-color: var(--brown-opera-950-100);
  }

  .headerActions {
    min-height: 20rem;
    background-image: url('/actions-illustration.svg');
    background-repeat: no-repeat;
    background-position: right top;
    @media all and (max-width: 767px) {
      background-image: none;
    }
  }
</style>
