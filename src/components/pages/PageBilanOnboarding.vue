<template>
  <h1>Votre 1er bilan</h1>
  <h2>Quels sont les impacts de vos usages ?</h2>
  <section class="fr-grid-row fr-grid-row--gutters fr-pb-6w">
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
  </section>
  <section class="background--white text--center fr-py-6w fr-px-2w">
    <h2 class="fr-h2">Où en est-on ?</h2>
    <p class="fr-text--lg">La France s’engage à réduire ses émissions de gaz à effet de serre de XX% d’ici 2030</p>
    <div class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-mb-2w fr-text--lg text--left">
      <img src="/graph-bilan-onboarding.svg" class="fr-mr-3w" alt="" />
      <div class="fr-grid-row flex-column graph-legend">
        <span class="fr-text--bold text--bleu">25% Particuliers (c’est nous !)</span>
        <span>50% Entreprises</span>
        <span>25% État et collectivités territoriales</span>
      </div>
    </div>
    <p class="fr-text--bold fr-mb-0">Répartition des efforts à engager dans le cadre de la planification écologique</p>
  </section>
  <section class="fr-py-6w fr-px-2w">
    <h2 class="fr-h2">Qu’est-ce que le coach a pour vous ?</h2>
  </section>
  <section class="background--white fr-py-6w fr-px-2w">
    <h2 class="fr-h2">Ce qu’ils en disent</h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-grid-row fr-grid-row--middle fr-col-md-6">
        <img src="/anneDeGap.png" class="img-object-fit-contain fr-mr-3w" alt="" />
        <div class="fr-col fr-col-md-8">
          <p class="fr-mb-0">
            « <strong>Agir</strong> m’a proposé des <strong>solutions concrètes pour moi et près de chez moi.</strong> »
          </p>
          <span class="fr-text--bold fr-text--sm">Anne de Gap</span>
        </div>
      </div>
      <div class="fr-grid-row fr-grid-row--middle fr-col-md-6">
        <img src="/michelDeSoissons.png" class="img-object-fit-contain fr-mr-3w" alt="" />
        <div class="fr-col fr-col-md-8">
          <p class="fr-mb-0">
            « Je ne savais pas qu’il y avait autant d’aides, j’ai réussi à <strong>faire des économies !</strong> »
          </p>
          <span class="fr-text--bold fr-text--sm">Michel de Soissons</span>
        </div>
      </div>
    </div>
  </section>
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

  .graph-legend span::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.25rem;
  }

  .graph-legend span:first-child::before {
    background: var(--blue-france-sun-113-625);
  }

  .graph-legend span:nth-child(2)::before {
    background: #919191;
  }

  .graph-legend span:nth-child(3)::before {
    background: #353535;
  }
</style>
