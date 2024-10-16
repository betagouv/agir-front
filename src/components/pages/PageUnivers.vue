<template>
  <div class="fr-container fr-mt-4w" v-if="isLoading">
    <CarteSkeleton />
  </div>

  <div v-else class="fr-container">
    <FilDAriane :page-courante="`Univers - ${universViewModel?.nom}`" />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="universViewModel?.urlImage"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        width="80"
        height="80"
        alt="univers"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ universViewModel?.nom }}</h1>
    </div>
  </div>

  <div v-if="!isLoading">
    <section id="thematiques" v-if="thematiquesViewModel">
      <div class="fr-container">
        <ThematiquesListe :univers-id="useRoute().params.id.toString()" :thematiques="thematiquesViewModel" />
      </div>
    </section>

    <section class="fr-py-6w background--white" id="defis" v-if="defisViewModel">
      <div class="fr-container">
        <ActionListe :defis="defisViewModel" />
      </div>
    </section>

    <section class="fr-py-6w" v-if="servicesViewModel?.services">
      <div class="fr-container">
        <h2 class="fr-h2">Mes services</h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div v-for="service in servicesViewModel.services" :key="service.label" class="fr-col-6 fr-col-md-3">
            <ServiceLinkExterne
              v-if="service.estServiceExterne"
              :url="service.url"
              :titre="service.label"
              :sous-titre="service.legende"
            />
            <ServiceLink
              v-else
              :url="service.url"
              :label="service.label"
              :picto="service.picto"
              :legende="service.legende"
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
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import ActionListe from '../custom/Action/ActionListe.vue';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import ServiceLink from '@/components/custom/Service/ServiceLink.vue';
  import ServiceLinkExterne from '@/components/custom/Service/ServiceLinkExterne.vue';
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
  import {
    ServicesRechercheViewModel,
    ServiceRecherchePresenterImpl,
  } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.presenter.impl';
  import { ServiceRechercheRepositoryAxios } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.repository.axios';
  import { RecupererServicesRechercheParUniversUsecase } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParUnivers.usecase';
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
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const isLoading = ref<boolean>(true);
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  const thematiquesViewModel = ref<ThematiqueViewModel[]>();
  const universViewModel = ref<UniversViewModel>();
  const defisViewModel = ref<DefiDescriptionViewModel[]>();
  const servicesViewModel = ref<ServicesRechercheViewModel>();
  let universId = useRoute().params.id.toString();
  const lancerChargementDesDonnees = () => {
    isLoading.value = true;
    const idUtilisateur = store.utilisateur.id;
    const recupererUniversUsecase = new RecupererUniversUsecase(new UniversRepositoryAxios());
    const chargerRecommandationsPersonnaliseesUsecase = new RecupererRecommandationsPersonnaliseesUniversUsecase(
      new RecommandationsPersonnaliseesRepositoryAxios(),
    );
    const recupererThematiquesUsecase = new RecupererThematiquesUniversUsecase(new ThematiqueRepositoryAxios());
    const recupererDefiParUniversUsecase = new RecupererListeDefisParUniversUsecase(new DefiRepositoryAxios());
    const recupererServicesRechercheParUniversUsecase = new RecupererServicesRechercheParUniversUsecase(
      new ServiceRechercheRepositoryAxios(),
    );
    Promise.all([
      recupererUniversUsecase.execute(
        idUtilisateur,
        universId,
        new UniversPresenterImpl(vm => (universViewModel.value = vm)),
      ),
      chargerRecommandationsPersonnaliseesUsecase.execute(
        universId,
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(vm => (recommandationsPersonnaliseesViewModel.value = vm)),
      ),
      recupererThematiquesUsecase.execute(
        universId,
        idUtilisateur,
        new ThematiquesPresenterImpl(vm => (thematiquesViewModel.value = vm)),
      ),
      recupererDefiParUniversUsecase.execute(
        idUtilisateur,
        universId,
        new ListeDefisDescriptionPresenterImpl(vm => (defisViewModel.value = vm)),
      ),
      recupererServicesRechercheParUniversUsecase.execute(
        idUtilisateur,
        universId,
        new ServiceRecherchePresenterImpl(vm => (servicesViewModel.value = vm)),
      ),
    ])
      .then(() => {
        isLoading.value = false;
      })
      .catch(() => {
        isLoading.value = false;
      });
  };
  onBeforeRouteUpdate((to, from, next) => {
    next();
    universId = to.params.id.toString();
    lancerChargementDesDonnees();
  });
  onMounted(() => {
    lancerChargementDesDonnees();
  });
</script>
