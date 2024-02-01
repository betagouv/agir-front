<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Bibliothèque" />
    <h1 class="fr-h2">Base de connaissances</h1>
    <div v-if="bibliothequeViewModel" class="fr-grid-row">
      <div class="fr-col-md-4 fr-col-12">
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
          <div class="fr-col-6" v-for="article in bibliothequeViewModel.articles" :key="article.titre">
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
  import { BibliothequeRepositoryInmemory } from '@/bibliotheque/adapters/bibliotheque.repository.inmemory';
  import { utilisateurStore } from '@/store/utilisateur';
  import { BibliothequePresenterImpl } from '@/bibliotheque/adapters/bibliotheque.presenter.impl';

  const { id: utilisateurId } = utilisateurStore().utilisateur;

  const bibliothequeViewModel = ref<BibliothequeViewModel>();

  const chargerBibliothequeUsecase = new ChargerBibliothequeUsecase(new BibliothequeRepositoryInmemory());
  const bibliothequePresenterImpl = new BibliothequePresenterImpl(
    viewModel => (bibliothequeViewModel.value = viewModel)
  );

  onMounted(() => {
    chargerBibliothequeUsecase.execute(utilisateurId, [], bibliothequePresenterImpl);
  });

  const updateThematique = values => {
    chargerBibliothequeUsecase.execute(utilisateurId, values || [], bibliothequePresenterImpl);
  };
</script>
