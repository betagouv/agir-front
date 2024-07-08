<template>
  <div class="fr-container">
    <FilDAriane :page-courante="`Univers - ${univers?.nom}`" />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="univers?.urlImage"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        width="80"
        height="80"
        alt="univers"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ univers?.nom }}</h1>
    </div>
  </div>

  <section id="thematiques" v-if="thematiques">
    <div class="fr-container">
      <ThematiquesListe :univers-id="universId" :thematiques="thematiques" />
    </div>
  </section>

  <section class="fr-py-6w background--white" id="defis" v-if="defis">
    <div class="fr-container">
      <ActionListe :defis="defis" />
    </div>
  </section>

  <section class="fr-py-6w" v-if="universId === 'alimentation'">
    <div class="fr-container">
      <h2 class="fr-h2">Vos services</h2>
      <div class="fr-grid-row fr-grid-row--gutters">
        <div class="fr-col-6 fr-col-md-3">
          <ServiceLink
            :url="RouteServiceName.SERVICE_FRUITS_ET_LEGUMES"
            label="Fruits et légumes de saison"
            picto="/cerise.png"
            legende="Juillet"
          />
        </div>
        <div class="fr-col-6 fr-col-md-3">
          <ServiceLink
            :url="RouteServiceName.PROXIMITE"
            label="Mes commerces de proximités"
            picto="/commerce.png"
            legende="Dijon"
          />
        </div>
      </div>
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
  import ActionListe from '../custom/Action/ActionListe.vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import ServiceLink from '@/components/custom/Service/ServiceLink.vue';
  import ThematiquesListe from '@/components/custom/Thematiques/ThematiquesListe.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import {
    DefiDescriptionViewModel,
    ListeDefisDescriptionPresenterImpl,
  } from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';
  import { RecupererListeDefisParUniversUsecase } from '@/domaines/defi/recupererListeDefisParUnivers.usecase';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import { RecupererRecommandationsPersonnaliseesUniversUsecase } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnaliseesUnivers.usecase';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import {
    ThematiquesPresenterImpl,
    ThematiqueViewModel,
  } from '@/domaines/thematiques/adapters/thematiques.presenter.impl';
  import { RecupererThematiquesUniversUsecase } from '@/domaines/thematiques/recupererThematiquesUnivers.usecase';
  import { UniversViewModel } from '@/domaines/univers/adapters/listeUnivers.presenter.impl';
  import { UniversPresenterImpl } from '@/domaines/univers/adapters/univers.presenter.impl';
  import { UniversRepositoryAxios } from '@/domaines/univers/adapters/univers.repository.axios';
  import { RecupererUniversUsecase } from '@/domaines/univers/recupererUnivers.usecase';
  import { RouteServiceName } from '@/router/services/routes';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const route = useRoute();
  const isLoading = ref<boolean>(true);

  const universId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  const thematiques = ref<ThematiqueViewModel[]>();
  const univers = ref<UniversViewModel>();
  const defis = ref<DefiDescriptionViewModel[]>();

  function onUniversPretAAfficher(viewModel: UniversViewModel) {
    univers.value = viewModel;
  }

  function onRecommandationsPretesAAfficher(viewModel: RecommandationPersonnaliseeViewModel) {
    recommandationsPersonnaliseesViewModel.value = viewModel;
  }

  function onThematiquesPretesAAfficher(viewModel: ThematiqueViewModel[]) {
    thematiques.value = viewModel;
  }

  function onDefisPretsAAfficher(viewModel: DefiDescriptionViewModel[]) {
    defis.value = viewModel;
  }

  const lancerChargementDesDonnees = () => {
    const idUtilisateur = store.utilisateur.id;
    const recupererUniversUsecase = new RecupererUniversUsecase(new UniversRepositoryAxios());
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUniversUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );
    const recupererThematiquesUsecase = new RecupererThematiquesUniversUsecase(new ThematiqueRepositoryAxios());
    const recupererDefiParUniversUsecase = new RecupererListeDefisParUniversUsecase(new DefiRepositoryAxios());
    Promise.all([
      recupererUniversUsecase.execute(idUtilisateur, universId, new UniversPresenterImpl(onUniversPretAAfficher)),
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
      recupererDefiParUniversUsecase.execute(
        idUtilisateur,
        universId,
        new ListeDefisDescriptionPresenterImpl(onDefisPretsAAfficher),
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
