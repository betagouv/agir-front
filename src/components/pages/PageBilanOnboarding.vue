<template>
  <div class="fr-container">
    <h1>Premiers résultats</h1>
    <section class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-pb-6w">
      <div class="fr-col-lg-6 fr-col-12">
        <BilanOnboardingEstimation
          :phrase="onboardingResultatViewModel?.phrase"
          :resultat="onboardingResultatViewModel?.resultat"
        />
      </div>
      <div class="fr-col-lg-6 fr-col-12 text--center">
        <img alt="Plateforme Agir :" src="/logo_agir.png" class="fr-mb-3w" />
        <h2 class="fr-px-4w">Nous avons tous les moyens d’agir à notre échelle !</h2>
        <span class="badge--bleu display-block fr-h4 fr-mx-auto background-bleu-light fr-p-2w"
          >Déjà + de XXX inscrits</span
        >
        <router-link class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line" :to="{ name: 'creation-compte' }">
          Rejoindre Agir
        </router-link>
      </div>
    </section>
  </div>
  <section class="background--white fr-py-6w">
    <div class="fr-container text--center">
      <BilanOnboardingStatFrance />
    </div>
  </section>
  <section class="fr-container fr-py-6w fr-px-2w">
    <h2 class="fr-h2">Qu’est-ce que le coach a pour vous ?</h2>
  </section>
  <section class="background--white fr-py-6w">
    <div class="fr-container">
      <BilanOnboardingTemoignage />
    </div>
  </section>
  <section class="fr-container">
    <div class="fr-grid fr-grid-row fr-grid-row--middle flex-column fr-pt-16w fr-pb-8w">
      <img alt="" src="/logo_agir.png" class="fr-mb-3w" />
      <h2 class="fr-h1 text--center fr-col-lg-9">
        Réduisez votre empreinte écologique selon vos moyens, vos lieux de vie et vos envies
      </h2>
      <router-link class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line" :to="{ name: 'creation-compte' }">
        S'inscrire
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { onboardingStore } from '@/store/onboarding';
  import { EvaluerOnboardingUsecase } from '@/onboarding/evaluerOnboarding.usecase';
  import { OnboardingRepositoryAxios } from '@/onboarding/adapters/onboarding.repository.axios';
  import {
    OnboardingResultatPresenterImpl,
    OnboardingResultatViewModel,
  } from '@/onboarding/adapters/onboarding.presenter.impl';

  import BilanOnboardingEstimation from '@/components/custom/BilanOnboarding/BilanOnboardingEstimation.vue';
  import BilanOnboardingStatFrance from '@/components/custom/BilanOnboarding/BilanOnboardingStatFrance.vue';
  import BilanOnboardingTemoignage from '@/components/custom/BilanOnboarding/BilanOnboardingTemoignage.vue';

  const onBoardingStore = onboardingStore();
  let onboardingResultatViewModel = ref<OnboardingResultatViewModel>();
  const evaluerOnboarding = new EvaluerOnboardingUsecase(new OnboardingRepositoryAxios());
  evaluerOnboarding.execute(
    onBoardingStore.$state,
    new OnboardingResultatPresenterImpl((resultat: OnboardingResultatViewModel) => {
      onboardingResultatViewModel.value = resultat;
    })
  );
</script>

<style scoped>
  .badge--bleu {
    width: fit-content;
    border-radius: 3rem;
    color: var(--blue-france-sun-113-625);
  }
</style>
