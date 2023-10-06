<template>
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
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import IndicateurDEtapes from '@/components/dsfr/IndicateurDEtapes.vue';
  import OnboardingEtapeTransport from '@/components/custom/OnboardingEtapeTransport.vue';
  import OnboardingEtapeLogement from '@/components/custom/OnboardingEtapeLogement.vue';
  import OnboardingEtapeAlimentation from '@/components/custom/OnboardingEtapeAlimentation.vue';
  import OnboardingEtapeConsommation from '@/components/custom/OnboardingEtapeConsommation.vue';
  import AsideOnboardingEtapeTransport from '@/components/custom/AsideOnboardingEtapeTransport.vue';
  import AsideOnboardingEtapeLogement from '@/components/custom/AsideOnboardingEtapeLogement.vue';
  import AsideOnboardingEtapeAlimentation from '@/components/custom/AsideOnboardingEtapeAlimentation.vue';
  import AsideOnboardingEtapeConsommation from '@/components/custom/AsideOnboardingEtapeConsommation.vue';

  const router = useRouter();
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
