<template>
  <div class="background-brown-opera-950 headerActions">
    <div class="fr-container">
      <h1 class="fr-h1 fr-mb-1w fr-pt-5w">Explorer toutes nos actions</h1>
      <p class="fr-text--xl fr-mb-5w">
        Et découvrez nos conseils, adresses et aides financières pour vous accompagner !
      </p>

      <div class="full-width background--white fr-grid-row border-top--bleu">
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-3 fr-p-2w"></div>
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-3 fr-p-2w">
          <CatalogueFiltreThematiques
            v-if="filtresViewModel?.filtres"
            :filtres="filtresViewModel.filtres"
            @update-thematiques="updateThematiques"
          />
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-3 fr-p-2w">
          <CatalogueFiltreStatut
            @rechercher-par-deja-vu="rechercherParDejaVu"
            @rechercher-par-deja-realisees="rechercherParDejaRealisees"
          />
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-col-md-3 fr-p-2w">
          <div class="flex align-items--center flex-center full-height">
            <InputSearchBar
              id="rechercheParTitre"
              name="titreRessource"
              placeholder="Rechercher"
              @submit="rechercherParTitre"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <section class="fr-container fr-my-3w">
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-3 fr-col-12">
        <CatalogueActionsFiltres
          v-if="filtresViewModel"
          :filtres="filtresViewModel.filtres"
          @rechercher-par-deja-vu="rechercherParDejaVu"
          @rechercher-par-deja-realisees="rechercherParDejaRealisees"
        />
      </div>

      <div v-if="filtresViewModel" class="fr-col-md-9 fr-col-12">
        <h2 class="fr-h4">{{ filtresViewModel.phraseNombreActions }}</h2>

        <CatalogueActionsComposant
          v-if="actionsViewModel"
          :actions="actionsViewModel"
          card-classes="fr-col-12 fr-col-md-4"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import CatalogueActionsFiltres from '@/components/custom/Action/Catalogue/CatalogueActionsFiltres.vue';
  import CatalogueFiltreStatut from '@/components/custom/Action/Catalogue/CatalogueFiltreStatut.vue';
  import CatalogueFiltreThematiques from '@/components/custom/Action/Catalogue/CatalogueFiltreThematiques.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
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

  const rechercheTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);
  const filtreDejaVu = ref<boolean>(false);
  const filtreDejaRealisees = ref<boolean>(false);

  onMounted(async () => {
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(idUtilisateur, catalogueActionsPresenter);
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

  .border-top--bleu {
    border-top: 2px solid var(--blue-france-sun-113-625);
  }
</style>
