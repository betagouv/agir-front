<template>
  <h1>Votre 1er bilan</h1>
  <h2>Quels sont les impacts de vos usages ?</h2>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-6 fr-col-12">
      <CarteVierge>
        <div v-for="item in onboardingResultatViewModel" :key="item.libelle">
          <OnboardingJauge class="fr-mb-5v" :libelle="item.libelle" :valeur="item.valeur" />
        </div>
      </CarteVierge>
    </div>
    <div class="fr-col-lg-6 fr-col-12 text--center">
      <img alt="Plateforme Agir :" src="/logo_agir.png" class="fr-mb-3w" />
      <h2>Devenez acteur de votre transition écologique !</h2>
      <button class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line">S'inscrire</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onboardingStore } from '@/store/onboarding';
  import { EvaluerOnboardingUsecase } from '@/onboarding/evaluerOnboarding.usecase';
  import { OnboardingRepositoryAxios } from '@/onboarding/adapters/onboarding.repository.axios';
  import {
    OnboardingResultatPresenterImpl,
    OnboardingResultatViewModel,
  } from '@/onboarding/adapters/onboarding.presenter.impl';
  import OnboardingJauge from '@/components/custom/OnboardingJauge.vue';
  import { ref } from 'vue';
  import CarteVierge from '@/components/CarteVierge.vue';

  const onBoardingStore = onboardingStore();
  let onboardingResultatViewModel = ref<OnboardingResultatViewModel[]>();
  const evaluerOnboarding = new EvaluerOnboardingUsecase(new OnboardingRepositoryAxios());
  evaluerOnboarding.execute(
    onBoardingStore.$state,
    new OnboardingResultatPresenterImpl((resultat: OnboardingResultatViewModel[]) => {
      onboardingResultatViewModel.value = resultat;
    })
  );
</script>
