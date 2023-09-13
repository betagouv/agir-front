<template>
  <FilDAriane
    :page-courante="titrePage"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat :simulation-aides-view-model="simulationAidesVeloViewModel" :titre="titrePage">
    <FormulaireAideVelo @submit-simulation="submitSimulation" />
  </AidesResultat>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";
  import FormulaireAideVelo from '@/components/custom/FormulaireAideVelo.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  
  const titrePage = "Acheter un vélo";
  const simulationAidesVeloViewModel = ref<SimulationAideResultatViewModel | null>(null);

  const submitSimulation = (data: SimulationAideResultatViewModel) => {
    simulationAidesVeloViewModel.value = data;
  };

  defineProps<{
    titre: string
  }>();
</script>