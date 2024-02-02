<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Bibliothèque" />
    <h1 class="fr-h2">Base de connaissances</h1>
    <div v-if="bibliothequeViewModel" class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-4 fr-col-12">
        <InputSearchBar
          id="rechercheParTitre"
          name="titreRessource"
          placeholder="Rechercher par titre"
          class="fr-mb-2w"
          @submit="rechercherParTitre"
        />
        <h2 class="fr-h4">Filtres</h2>
        <InputCheckbox
          id="thematiqueArticle"
          label="Thématiques"
          :options="bibliothequeViewModel.filtres"
          @update="updateThematique"
          v-model="bibliothequeViewModel.filtres"
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
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>Chargement en cours ...</div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import BibliothequeCard from '@/components/custom/Bibliotheque/BibliothequeCard.vue';
  import { BibliothequeViewModel } from '@/bibliotheque/ports/bibliotheque.presenter';
  import { onMounted, ref } from 'vue';
  import { ChargerBibliothequeUsecase } from '@/bibliotheque/chargerBibliotheque.usecase';
  import { BibliothequeRepositoryAxios } from '@/bibliotheque/adapters/bibliotheque.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { BibliothequePresenterImpl } from '@/bibliotheque/adapters/bibliotheque.presenter.impl';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';

  const { id: utilisateurId } = utilisateurStore().utilisateur;

  const bibliothequeViewModel = ref<BibliothequeViewModel>();
  const searchTitre = ref<string>();
  const filtresThematiques = ref<string[]>();

  const chargerBibliothequeUsecase = new ChargerBibliothequeUsecase(new BibliothequeRepositoryAxios());
  const bibliothequePresenterImpl = new BibliothequePresenterImpl(
    viewModel => (bibliothequeViewModel.value = viewModel)
  );

  onMounted(async () => {
    await chargerBibliothequeUsecase.execute(utilisateurId, [], bibliothequePresenterImpl);
  });

  const updateThematique = async thematiques => {
    filtresThematiques.value = thematiques;

    await chargerBibliothequeUsecase.execute(
      utilisateurId,
      thematiques || [],
      bibliothequePresenterImpl,
      searchTitre.value
    );
  };

  const rechercherParTitre = async titre => {
    searchTitre.value = titre;

    await chargerBibliothequeUsecase.execute(
      utilisateurId,
      filtresThematiques.value || [],
      bibliothequePresenterImpl,
      titre
    );
  };
</script>
