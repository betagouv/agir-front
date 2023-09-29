<template>
  <h1>Quelques questions pour apprendre à se connaître</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-9">
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
      </div>
    </div>
    <div class="fr-col-3">
      <AsideOnboardingEtapeTransport v-if="etapeCourante === 0" />
      <AsideOnboardingEtapeLogement v-if="etapeCourante === 1" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IndicateurDEtapes from '@/components/dsfr/IndicateurDEtapes.vue';
  import OnboardingEtapeTransport from '@/components/custom/OnboardingEtapeTransport.vue';
  import OnboardingEtapeLogement from '../custom/OnboardingEtapeLogement.vue';
  import AsideOnboardingEtapeTransport from '@/components/custom/AsideOnboardingEtapeTransport.vue';
  import AsideOnboardingEtapeLogement from '@/components/custom/AsideOnboardingEtapeLogement.vue';

  const etapeCourante = ref<number>(0);
  const etapesOnboarding = ['Transports', 'Logement', 'Alimentation'];

  const submitEtape = () => {
    etapeCourante.value++;
  };

  const retourEtapePrecedente = () => {
    etapeCourante.value--;
  };
</script>
