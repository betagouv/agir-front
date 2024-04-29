<template>
  <div class="fr-container">
    <h1 class="fr-h1 fr-m-0 fr-mt-4w">Univers</h1>
  </div>

  <section id="thematiques">
    <div class="fr-container">
      <div class="fr-grid-row fr-grid-row--gutters list-style-none fr-mb-2w">
        <ThematiquesCard v-for="thematique in thematiques" :key="thematique.id" :thematique="thematique" />
      </div>
    </div>
  </section>

  <section
    class="fr-py-6w background--white"
    id="defis"
    v-if="
      utilisateurStore().utilisateur.fonctionnalitesDebloquees.includes('defis') &&
      recommandationsPersonnaliseesViewModel
    "
  >
    <div class="fr-container">
      <CoachActions :recommandations="recommandationsPersonnaliseesViewModel.defis" />
    </div>
  </section>

  <section
    id="recommandations"
    v-if="store.utilisateur.fonctionnalitesDebloquees.includes(Fonctionnalites.RECOMMANDATIONS)"
    class="fr-py-6w fr-background-contrast--grey"
  >
    <div class="fr-container" v-if="!isLoading">
      <h2 class="fr-h2 fr-mb-0">Recommandé, pour vous</h2>
      <p class="fr-text--xl">Une sélection d’articles et de services, pour vous, selon vos préférences !</p>
      <CoachRecommandations
        v-if="recommandationsPersonnaliseesViewModel"
        :recommandations="recommandationsPersonnaliseesViewModel.autresRecommandations"
      />
    </div>
    <div class="fr-container" v-else>
      <CarteSkeleton />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import CoachActions from '@/components/custom/Coach/CoachActions.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import ThematiquesCard from '@/components/custom/ThematiquesCard.vue';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import { RecupererRecommandationsPersonnaliseesUniversUsecase } from '@/recommandationsPersonnalisees/recupererRecommandationsPersonnaliseesUnivers.usecase';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ThematiqueRepositoryAxios } from '@/thematiques/adapters/thematique.repository.axios';
  import { ThematiquesPresenterImpl, ThematiqueViewModel } from '@/thematiques/adapters/thematiques.presenter.impl';
  import { RecupererThematiquesUniversUsecase } from '@/thematiques/recupererThematiquesUniversUsecase';

  const store = utilisateurStore();
  const route = useRoute();
  const isLoading = ref<boolean>(true);

  const universId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  const thematiques = ref<ThematiqueViewModel[]>();

  function onRecommandationsPretesAAfficher(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function onThematiquesPretesAAfficher(viewModel: ThematiqueViewModel[]) {
    thematiques.value = viewModel;
  }

  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUniversUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );

    const recupererThematiquesUsecase = new RecupererThematiquesUniversUsecase(new ThematiqueRepositoryAxios());

    Promise.all([
      chargerRecommandationsPersonnaliseesUsecase.execute(
        universId,
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(onRecommandationsPretesAAfficher),
      ),
      recupererThematiquesUsecase.execute(
        universId,
        idUtilisateur,
        new ThematiquesPresenterImpl(onThematiquesPretesAAfficher),
      ),
    ])
      .then(() => {
        isLoading.value = false;
      })
      .catch(() => {
        isLoading.value = false;
      });
  };

  onMounted(() => {
    lancerChargementDesDonnees();
  });
</script>
