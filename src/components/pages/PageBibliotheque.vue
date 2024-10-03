<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Bibliothèque" />
    <h1 class="fr-h2">Ma bibliothèque</h1>
    <div v-if="isLoadingGlobal">Chargement en cours ...</div>
    <div v-else-if="!isLoadingGlobal && bibliothequeViewModel" class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-4 fr-col-12">
        <BibliothequeFiltres
          @rechercher-par-titre="rechercherParTitre"
          @update-thematiques="updateThematiques"
          @rechercher-par-favoris="rechercherParFavoris"
          :filtres="bibliothequeViewModel.filtres"
        />
      </div>
      <div class="fr-col-md-8 fr-col-12">
        <h2 class="fr-h4">
          {{ bibliothequeViewModel.phraseNombreArticles }}
        </h2>
        <div v-if="isLoadingFiltre">Chargement en cours ...</div>
        <div v-else-if="bibliothequeViewModel.articles.length === 0">
          <div class="text--center">
            <img src="/bibliotheque_illustration.svg" alt="" />
            <h3 class="fr-h4 fr-mt-2w">Débloquez des articles en complétant des missions !</h3>
            <router-link class="fr-btn fr-btn--lg" :to="{ name: RouteCoachName.COACH }">
              Retourner à l'accueil
            </router-link>
          </div>
        </div>
        <div v-else class="fr-grid-row fr-grid-row--gutters">
          <div class="fr-col-md-6 fr-col-12" v-for="article in bibliothequeViewModel.articles" :key="article.titre">
            <BibliothequeCard
              :id="article.idDuContenu"
              :titre="article.titre"
              :image="article.image"
              :description="article.description"
              :thematique="article.thematique"
              :url="article.url"
              :favoris="article.favoris"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BibliothequeCard from '@/components/custom/Bibliotheque/BibliothequeCard.vue';
  import BibliothequeFiltres from '@/components/custom/Bibliotheque/BibliothequeFiltres.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { BibliothequePresenterImpl } from '@/domaines/bibliotheque/adapters/bibliotheque.presenter.impl';
  import { BibliothequeRepositoryAxios } from '@/domaines/bibliotheque/adapters/bibliotheque.repository.axios';
  import { ChargerBibliothequeUsecase } from '@/domaines/bibliotheque/chargerBibliotheque.usecase';
  import { FiltrerBibliothequeUsecase } from '@/domaines/bibliotheque/filtrerBibliotheque.usecase';
  import { BibliothequeViewModel } from '@/domaines/bibliotheque/ports/bibliotheque.presenter';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { utilisateurStore } from '@/store/utilisateur';

  const { id: utilisateurId } = utilisateurStore().utilisateur;

  const isLoadingGlobal = ref<boolean>(true);
  const isLoadingFiltre = ref<boolean>(false);
  const bibliothequeViewModel = ref<BibliothequeViewModel>();
  const searchTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);
  const filtreFavoris = ref<boolean>(false);

  const bibliothequePresenterImpl = new BibliothequePresenterImpl(
    viewModel => (bibliothequeViewModel.value = viewModel),
  );

  onMounted(async () => {
    const chargerBibliothequeUsecase = new ChargerBibliothequeUsecase(new BibliothequeRepositoryAxios());
    await chargerBibliothequeUsecase.execute(utilisateurId, bibliothequePresenterImpl);
    isLoadingGlobal.value = false;
  });

  const updateThematiques = async thematiques => {
    isLoadingFiltre.value = true;
    filtresThematiques.value = thematiques;
    await lancerLaRecherche();
    isLoadingFiltre.value = false;
  };

  const rechercherParTitre = async titre => {
    isLoadingFiltre.value = true;
    searchTitre.value = titre;
    await lancerLaRecherche();
    isLoadingFiltre.value = false;
  };

  const rechercherParFavoris = async checked => {
    isLoadingFiltre.value = true;
    filtreFavoris.value = checked;
    await lancerLaRecherche();
    isLoadingFiltre.value = false;
  };

  const lancerLaRecherche = async () => {
    const filterBibliothequeUsecase = new FiltrerBibliothequeUsecase(new BibliothequeRepositoryAxios());
    await filterBibliothequeUsecase.execute(
      utilisateurId,
      filtresThematiques.value,
      searchTitre.value,
      filtreFavoris.value,
      bibliothequePresenterImpl,
    );
  };
</script>
