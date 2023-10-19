<template>
  <div class="fr-container">
    <h1>Quelques questions pour apprendre à se connaître</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-9 fr-col-12">
        <div class="background--white border border-radius--md fr-p-3w">
          <IndicateurDEtapes
            :etape-courante="etapeCourante + 1"
            :etape-total="etapesOnboarding.length"
            :titre-etape="etapesOnboarding[etapeCourante]"
            :titre-etape-suivante="etapesOnboarding[etapeCourante + 1]"
          />
          <OnboardingEtapeTransport v-if="etapeCourante === 0" @submitEtape="submitEtape" />
          <OnboardingEtapeLogement
            v-if="etapeCourante === 1"
            @retourEtapePrecedente="retourEtapePrecedente"
            @submitEtape="submitEtape"
          />
          <OnboardingEtapeAlimentation
            v-if="etapeCourante === 2"
            @retourEtapePrecedente="retourEtapePrecedente"
            @submitEtape="submitEtape"
          />
          <OnboardingEtapeConsommation
            v-if="etapeCourante === 3"
            @retourEtapePrecedente="retourEtapePrecedente"
            @submitEtape="submitEtape"
          />
        </div>
      </div>
      <div class="fr-col-lg-3 fr-col-12">
        <AsideOnboardingEtapeTransport v-if="etapeCourante === 0" />
        <AsideOnboardingEtapeLogement v-if="etapeCourante === 1" />
        <AsideOnboardingEtapeAlimentation v-if="etapeCourante === 2" />
        <AsideOnboardingEtapeConsommation v-if="etapeCourante === 3" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IndicateurDEtapes from '@/components/dsfr/IndicateurDEtapes.vue';
  import OnboardingEtapeTransport from '@/components/custom/Onboarding/OnboardingEtapeTransport.vue';
  import OnboardingEtapeLogement from '@/components/custom/Onboarding/OnboardingEtapeLogement.vue';
  import OnboardingEtapeAlimentation from '@/components/custom/Onboarding/OnboardingEtapeAlimentation.vue';
  import OnboardingEtapeConsommation from '@/components/custom/Onboarding/OnboardingEtapeConsommation.vue';
  import AsideOnboardingEtapeTransport from '@/components/custom/Onboarding/AsideOnboardingEtapeTransport.vue';
  import AsideOnboardingEtapeLogement from '@/components/custom/Onboarding/AsideOnboardingEtapeLogement.vue';
  import AsideOnboardingEtapeAlimentation from '@/components/custom/Onboarding/AsideOnboardingEtapeAlimentation.vue';
  import AsideOnboardingEtapeConsommation from '@/components/custom/Onboarding/AsideOnboardingEtapeConsommation.vue';

  const etapeCourante = ref<number>(0);
  const etapesOnboarding = ['Transports', 'Logement', 'Alimentation', 'Consommation'];

  const submitEtape = () => {
    window.scrollTo(0, 0);
    etapeCourante.value++;
  };

  const retourEtapePrecedente = () => {
    window.scrollTo(0, 0);
    etapeCourante.value--;
  };
</script>
