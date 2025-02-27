<template>
  <section class="fr-container fr-my-3w">
    <h1 class="fr-h1 fr-mt-4w fr-mb-4w">Catalogue d'actions</h1>

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-4 fr-col-12">
        <CatalogueActionsFiltres
          v-if="catalogueViewModel"
          :filtres="catalogueViewModel.filtres"
          @rechercher-par-deja-vu="rechercherParDejaVu"
          @rechercher-par-titre="rechercherParTitre"
          @update-thematiques="updateThematiques"
        />
      </div>

      <div class="fr-col-md-8 fr-col-12" v-if="catalogueViewModel">
        <h4 class="fr-h4">{{ catalogueViewModel.phraseNombreActions }}</h4>

        <CatalogueActionsComposant :catalogue-view-model="catalogueViewModel" card-classes="fr-col-12 fr-col-md-6" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import CatalogueActionsFiltres from '@/components/custom/Action/Catalogue/CatalogueActionsFiltres.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(false);

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const catalogueViewModel = ref<CatalogueActionsViewModel>();
  const presenter = new CatalogueActionsPresenterImpl(actions => {
    catalogueViewModel.value = actions;
  });

  const rechercheTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);
  const filtreDejaVu = ref<boolean>(false);

  onMounted(async () => {
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(idUtilisateur, presenter);
  });

  const updateThematiques = async thematiques => {
    filtresThematiques.value = thematiques;
    await filtrerLaRecherche();
  };

  const rechercherParTitre = async titre => {
    rechercheTitre.value = titre;
    await filtrerLaRecherche();
  };

  const rechercherParDejaVu = async checked => {
    filtreDejaVu.value = checked;
    await filtrerLaRecherche();
  };

  async function filtrerLaRecherche() {
    isLoading.value = true;
    const usecase = new FiltrerCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(idUtilisateur, filtresThematiques.value, rechercheTitre.value, filtreDejaVu.value, presenter);
    isLoading.value = false;
  }
</script>
