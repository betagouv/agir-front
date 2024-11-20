<template>
  <div class="fr-container fr-mt-4w" v-if="isLoading">
    <CarteSkeleton />
  </div>

  <div class="fr-container">
    <FilDAriane :page-courante="thematique.labelDansLeMenu" />
    <div class="fr-grid-row align-items--center fr-mb-4w">
      <img
        :src="thematique.imageUrl"
        class="border-radius--full img-object-fit-cover fr-mr-2w"
        width="80"
        height="80"
        alt="thématique"
      />
      <h1 class="fr-h1 fr-col fr-m-0">{{ thematique.labelDansLeMenu }}</h1>
    </div>
  </div>

  <div v-if="!isLoading">
    <section id="thematiques" v-if="missionsViewModel">
      <div class="fr-container">
        <MissionsListe :missions="missionsViewModel" />
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

    <section class="fr-py-6w fr-background-contrast--grey" v-if="!isLoading && recommandationsPersonnaliseesViewModel">
      <div class="fr-container">
        <h2 class="fr-h2 fr-mb-0">Recommandé, pour vous</h2>
        <p class="fr-text--xl">Une sélection d’articles et de services, pour vous, selon vos préférences !</p>
        <CoachRecommandations :recommandations="recommandationsPersonnaliseesViewModel.autresRecommandations" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import ActionListe from '@/components/custom/Action/ActionListe.vue';
  import CoachRecommandations from '@/components/custom/Coach/CoachRecommandations.vue';
  import MissionsListe from '@/components/custom/Mission/MissionsListe.vue';
  import ServiceLink from '@/components/custom/Service/ServiceLink.vue';
  import ServiceLinkExterne from '@/components/custom/Service/ServiceLinkExterne.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import {
    DefiDescriptionViewModel,
    ListeDefisDescriptionPresenterImpl,
  } from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';
  import { RecupererListeDefisParThematiqueUsecase } from '@/domaines/defi/recupererListeDefisParThematique.usecase';
  import { MissionsPresenterImpl, MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { RecupererMissionsThematiqueUsecase } from '@/domaines/missions/recupererMissionsThematique.usecase';
  import {
    RecommandationPersonnaliseeViewModel,
    RecommandationsPersonnaliseesPresenterImpl,
  } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.presenter.impl';
  import { RecommandationsPersonnaliseesRepositoryAxios } from '@/domaines/recommandationsPersonnalisees/adapters/recommandationsPersonnalisees.repository.axios';
  import { RecupererRecommandationsPersonnaliseesThematiqueUsecase } from '@/domaines/recommandationsPersonnalisees/recupererRecommandationsPersonnaliseesThematique.usecase';
  import {
    ServicesRechercheViewModel,
    ServiceRecherchePresenterImpl,
  } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.presenter.impl';
  import { ServiceRechercheRepositoryAxios } from '@/domaines/serviceRecherche/catalogue/adapters/serviceRecherche.repository.axios';
  import { RecupererServicesRechercheParThematiqueUsecase } from '@/domaines/serviceRecherche/catalogue/recupererServicesRechercheParThematique.usecase';
  import { MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const isLoading = ref<boolean>(true);
  const recommandationsPersonnaliseesViewModel = ref<RecommandationPersonnaliseeViewModel>();
  const missionsViewModel = ref<MissionViewModel[]>();
  const defisViewModel = ref<DefiDescriptionViewModel[]>();
  const servicesViewModel = ref<ServicesRechercheViewModel>();
  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));
  let thematiqueId = thematique.value.clefTechniqueAPI;

  const lancerChargementDesDonnees = () => {
    isLoading.value = true;
    const idUtilisateur = store.utilisateur.id;
    const recupererRecommandationsPersonnaliseesThematiqueUsecase =
      new RecupererRecommandationsPersonnaliseesThematiqueUsecase(new RecommandationsPersonnaliseesRepositoryAxios());
    const recupererThematiquesUsecase = new RecupererMissionsThematiqueUsecase(new MissionsRepositoryAxios());
    const recupererListeDefisParThematiqueUsecase = new RecupererListeDefisParThematiqueUsecase(
      new DefiRepositoryAxios(),
    );
    const recupererServicesRechercheParThematiqueUsecase = new RecupererServicesRechercheParThematiqueUsecase(
      new ServiceRechercheRepositoryAxios(),
    );
    Promise.all([
      recupererRecommandationsPersonnaliseesThematiqueUsecase.execute(
        thematiqueId,
        idUtilisateur,
        new RecommandationsPersonnaliseesPresenterImpl(vm => (recommandationsPersonnaliseesViewModel.value = vm)),
      ),
      recupererThematiquesUsecase.execute(
        thematiqueId,
        idUtilisateur,
        new MissionsPresenterImpl(vm => (missionsViewModel.value = vm)),
      ),
      recupererListeDefisParThematiqueUsecase.execute(
        idUtilisateur,
        thematiqueId,
        new ListeDefisDescriptionPresenterImpl(vm => (defisViewModel.value = vm)),
      ),
      recupererServicesRechercheParThematiqueUsecase.execute(
        idUtilisateur,
        thematiqueId,
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
    thematique.value = MenuThematiques.getFromUrl(to.params.id as string)!;
    thematiqueId = thematique.value.clefTechniqueAPI;
    lancerChargementDesDonnees();
  });
  onMounted(() => {
    lancerChargementDesDonnees();
  });
</script>
