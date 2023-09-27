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
        <button class="fr-btn" @click="submitEtape">Continuer</button>
      </div>
    </div>
    <div class="fr-col-3">
      <CarteInfo>
        <p class="fr-text--bold">
          <span class="fr-icon-information-line" aria-hidden="true"></span>
          Pouquoi ces questions ?
        </p>
        <p class="fr-text--sm">Les transports sont un des principaux postes de notre empreinte écologique.</p>
        <p class="fr-text--sm">
          Par exemple, ils représentent XX% des émissions de gaz à effet de serre moyenne des ménages français.
        </p>
      </CarteInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import IndicateurDEtapes from '@/components/dsfr/IndicateurDEtapes.vue';
  import CarteInfo from '../custom/CarteInfo.vue';

  const etapeCourante = ref<number>(0);

  const etapesOnboarding = ['Transports', 'Logement', 'Alimentation'];

  const submitEtape = () => {
    etapeCourante.value++;
  };
</script>
