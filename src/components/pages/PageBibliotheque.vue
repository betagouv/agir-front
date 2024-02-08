<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Bibliothèque" />
    <h1 class="fr-h2">Base de connaissances</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && bibliothequeViewModel" class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-4 fr-col-12">
        <BibliothequeFiltres
          @rechercher-par-titre="rechercherParTitre"
          @update-thematiques="updateThematiques"
          :filtres="bibliothequeViewModel.filtres"
        />
      </div>
      <div class="fr-col-md-8 fr-col-12">
        <h2 class="fr-h4">{{ bibliothequeViewModel.articles.length }} articles</h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div class="fr-col-md-6 fr-col-12" v-for="article in bibliothequeViewModel.articles" :key="article.titre">
            <BibliothequeCard
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
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import BibliothequeFiltres from '@/components/custom/Bibliotheque/BibliothequeFiltres.vue';
  import BibliothequeCard from '@/components/custom/Bibliotheque/BibliothequeCard.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ChargerBibliothequeUsecase } from '@/bibliotheque/chargerBibliotheque.usecase';
  import { BibliothequeRepositoryAxios } from '@/bibliotheque/adapters/bibliotheque.repository.axios';
  import { BibliothequePresenterImpl } from '@/bibliotheque/adapters/bibliotheque.presenter.impl';
  import { BibliothequeViewModel } from '@/bibliotheque/ports/bibliotheque.presenter';
  import { FiltrerBibliothequeUsecase } from '@/bibliotheque/filtrerBibliotheque.usecase';

  const { id: utilisateurId } = utilisateurStore().utilisateur;

  const isLoading = ref<boolean>(true);
  const bibliothequeViewModel = ref<BibliothequeViewModel>();
  const searchTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);

  const bibliothequePresenterImpl = new BibliothequePresenterImpl(
    viewModel => (bibliothequeViewModel.value = viewModel)
  );

  onMounted(async () => {
    const chargerBibliothequeUsecase = new ChargerBibliothequeUsecase(new BibliothequeRepositoryAxios());
    await chargerBibliothequeUsecase.execute(utilisateurId, bibliothequePresenterImpl);
    isLoading.value = false;
  });

  const updateThematiques = async thematiques => {
    isLoading.value = true;
    filtresThematiques.value = thematiques;
    await lancerLaRecherche();
    isLoading.value = false;
  };

  const rechercherParTitre = async titre => {
    isLoading.value = true;
    searchTitre.value = titre;
    await lancerLaRecherche();
    isLoading.value = false;
  };

  const lancerLaRecherche = async () => {
    const filterBibliothequeUsecase = new FiltrerBibliothequeUsecase(new BibliothequeRepositoryAxios());
    await filterBibliothequeUsecase.execute(
      utilisateurId,
      filtresThematiques.value,
      searchTitre.value,
      bibliothequePresenterImpl
    );
  };
</script>
