<template>
  <div class="fr-container fr-pt-6w">
    <h1>Premiers résultats</h1>
    <section class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-pb-6w">
      <div class="fr-col-lg-6 fr-col-12">
        <BilanOnboardingEstimation
          :phrase="onboardingResultatViewModel?.phrase"
          :resultat="onboardingResultatViewModel?.resultat"
        />
      </div>
      <div class="fr-col-lg-6 fr-col-12 text--center">
        <img alt="Plateforme Agir :" src="/logo.svg" class="fr-mb-3w logo" />
        <h2 class="fr-px-4w">
          Toutes les solutions pour réduire votre empreinte écologique selon vos moyens, vos lieux de vie et vos envies
        </h2>
        <router-link
          class="fr-btn fr-btn--lg fr-btn--icon-left fr-icon-arrow-right-line"
          :to="{ name: RouteCompteName.CREATION_COMPTE }"
        >
          Inscrivez-vous !
        </router-link>
      </div>
    </section>
  </div>
  <section class="background--white fr-py-6w">
    <div class="fr-container">
      <BilanOnboardingStatFrance />
    </div>
  </section>
  <section v-if="onboardingResultatViewModel?.phrases" class="fr-container fr-py-6w fr-px-2w">
    <BilanOnboardingPhrasesCoach :phrases="onboardingResultatViewModel.phrases" />
  </section>
  <!-- <section class="background--white fr-py-6w">
    <div class="fr-container">
      <BilanOnboardingTemoignage />
    </div>
  </section> -->
  <section class="fr-container">
    <div class="fr-grid fr-grid-row fr-grid-row--middle flex-column fr-pt-8w fr-pb-12w">
      <img alt="Plateforme Agir :" src="/logo.svg" class="fr-mb-3w logo" />
      <h2 class="fr-h1 text--center fr-col-lg-9">
        Toutes les solutions pour réduire votre empreinte écologique selon vos moyens, vos lieux de vie et vos envies
      </h2>
      <router-link
        class="fr-btn fr-btn--lg fr-btn--icon-left fr-icon-arrow-right-line"
        :to="{ name: RouteCompteName.CREATION_COMPTE }"
      >
        S'inscrire
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  import BilanOnboardingEstimation from '@/components/custom/BilanOnboarding/BilanOnboardingEstimation.vue';
  import BilanOnboardingPhrasesCoach from '@/components/custom/BilanOnboarding/BilanOnboardingPhrasesCoach.vue';
  import BilanOnboardingStatFrance from '@/components/custom/BilanOnboarding/BilanOnboardingStatFrance.vue';
  import {
    OnboardingResultatPresenterImpl,
    OnboardingResultatViewModel,
  } from '@/domaines/onboarding/adapters/onboarding.presenter.impl';
  import { OnboardingRepositoryAxios } from '@/domaines/onboarding/adapters/onboarding.repository.axios';
  import { EvaluerOnboardingUsecase } from '@/domaines/onboarding/evaluerOnboarding.usecase';

  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingStore } from '@/store/onboarding';

  const onBoardingStore = onboardingStore();
  let onboardingResultatViewModel = ref<OnboardingResultatViewModel>();
  const evaluerOnboarding = new EvaluerOnboardingUsecase(new OnboardingRepositoryAxios());
  evaluerOnboarding.execute(
    onBoardingStore.$state,
    new OnboardingResultatPresenterImpl((resultat: OnboardingResultatViewModel) => {
      onboardingResultatViewModel.value = resultat;
    }),
  );
</script>

<style>
  .logo {
    width: 14rem;
  }
</style>
