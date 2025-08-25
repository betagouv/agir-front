<template>
  <div class="full-width background--white fr-grid-row border-top--bleu">
    <div :class="filtresColonnes" class="fr-p-2w">
      <CatalogueFiltreThematiques
        v-if="filtresViewModel?.filtres"
        :filtres="filtresViewModel.filtres"
        @update-thematiques="updateThematiques"
      />
    </div>

    <div :class="filtresColonnes" class="fr-p-2w" v-if="estConnecte">
      <CatalogueFiltreStatut
        @rechercher-par-deja-vu="rechercherParDejaVu"
        @rechercher-par-deja-realisees="rechercherParDejaRealisees"
      />
    </div>

    <div :class="filtresColonnes" class="fr-p-2w">
      <div class="flex align-items--center flex-center full-height">
        <InputSearchBar
          id="rechercheParTitre"
          name="titreRessource"
          placeholder="Rechercher"
          @submit="rechercherParTitre"
          class="full-width"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CatalogueFiltreStatut from '@/components/custom/Action/Catalogue/CatalogueFiltreStatut.vue';
  import CatalogueFiltreThematiques from '@/components/custom/Action/Catalogue/CatalogueFiltreThematiques.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
  import {
    CatalogueActionsPresenter,
    FiltresCatalogueActionsViewModel,
  } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const { catalogueActionsPresenter } = defineProps<{
    catalogueActionsPresenter: CatalogueActionsPresenter;
    filtresViewModel: FiltresCatalogueActionsViewModel;
  }>();

  const isLoading = ref<boolean>(false);
  const idUtilisateur = utilisateurStore().utilisateur.id;
  const estConnecte = utilisateurStore().estConnecte;
  const filtresColonnes = estConnecte ? 'fr-col-12 fr-col-sm-6 fr-col-md-4' : 'fr-col-12 fr-col-sm-6';

  const rechercheTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);
  const filtreDejaVu = ref<boolean>(false);
  const filtreDejaRealisees = ref<boolean>(false);

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

  const rechercherParDejaRealisees = async checked => {
    filtreDejaRealisees.value = checked;
    await filtrerLaRecherche();
  };

  async function filtrerLaRecherche() {
    isLoading.value = true;
    const usecase = new FiltrerCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(
      idUtilisateur,
      filtresThematiques.value,
      rechercheTitre.value,
      filtreDejaVu.value,
      filtreDejaRealisees.value,
      catalogueActionsPresenter,
    );
    isLoading.value = false;
  }
</script>

<style scoped>
  .border-top--bleu {
    border-top: 2px solid var(--blue-france-sun-113-625);
  }
</style>
