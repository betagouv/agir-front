<template>
  <FilDAriane
    :page-courante="titrePage"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat :simulationAidesVeloViewModel="simulationAidesVeloViewModel" :titre="titrePage">
    <FormulaireAideVelo @submit-simulation="submitSimulation" />
  </AidesResultat>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";
  import { SimulationAidesVeloViewModel } from '@/aides/ports/simulerAideVelo.presenter';
  import FormulaireAideVelo from '@/components/custom/FormulaireAideVelo.vue';
  
  const titrePage = "Acheter un vélo"
  const simulationAidesVeloViewModel = ref<SimulationAidesVeloViewModel | null>(null);

  const submitSimulation = (data: SimulationAidesVeloViewModel) => {
    simulationAidesVeloViewModel.value = data;
  };

  defineProps<{
    titre: string
  }>();
</script>