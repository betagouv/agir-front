<template>
  <h1>Votre 1er bilan</h1>
  <h2>Quels sont les impacts de vos usages ?</h2>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-6 fr-col-12">
      <CarteVierge>
        <div class="legende fr-text--sm fr-text--bold">
          <span class="fr-pl-2w">Impact faible</span>
          <span class="fr-pr-2w">Impact fort</span>
        </div>
        <div v-for="item in onboardingResultatViewModel" :key="item.libelle">
          <OnboardingJauge class="fr-mb-5v" :libelle="item.libelle" :valeur="item.valeur" />
        </div>
      </CarteVierge>
    </div>
    <div class="fr-col-lg-6 fr-col-12 text--center">
      <img alt="Plateforme Agir :" src="/logo_agir.png" class="fr-mb-3w" />
      <h2>Devenez acteur de votre transition écologique !</h2>
      <router-link class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line" :to="{ name: 'creation-compte' }">
        S'inscrire
      </router-link>
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

<style scoped>
  .legende {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    max-width: var(--widthJaugeOnboarding);
  }

  .legende span::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 11px;
    width: 11px;
    border-radius: 50%;
  }

  .legende span:first-child::before {
    left: 0;
    background: var(--blue-france-sun-113-625);
  }

  .legende span:nth-child(2)::before {
    right: 0;
    background-color: #e32416;
  }
</style>
