<template>
  <section class="fr-container fr-my-3w">
    <h1 class="fr-h1 fr-mt-4w fr-mb-4w">Catalogue d'actions</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-4 fr-col-12">
        <InputSearchBar
          id="rechercheParTitre"
          name="titreRessource"
          placeholder="Rechercher par titre"
          class="fr-mb-2w"
          @submit="rechercherParTitre"
        />
        <h2 class="fr-h4">Filtres</h2>
        <Interrupteur
          id="deja_vus"
          label="Déjà consultées"
          @rechercher-par-favoris="rechercherParFavoris"
          class="fr-mb-4w"
        />
        <InputCheckbox id="thematiqueArticle" label="Thématiques" :options="filtres" @update="updateThematiques" />
        <hr class="fr-hr" />
      </div>

      <div class="fr-col-md-8 fr-col-12">
        <h4 class="fr-h4">124 actions</h4>

        <CatalogueActionsComposant
          v-if="catalogueViewModel"
          :catalogue-view-model="catalogueViewModel"
          card-classes="fr-col-12 fr-col-md-6"
        />
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/custom/Action/CatalogueActionsComposant.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const catalogueViewModel = ref<CatalogueActionsViewModel>();
  const filtres = ref([{ id: 'id', label: 'label' }]);

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

  function rechercherParFavoris() {}

  function updateThematiques() {}

  function rechercherParTitre() {}
</script>

<style scoped>
  h1.fr-h1 {
    font-weight: 400;
  }
</style>
