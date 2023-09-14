<template>
  <FilDAriane
    :page-courante="titrePage"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat :simulation-aides-view-model="simulationAidesRetrofitViewModel" :titre="titrePage">
    <FormulaireAideRetrofit @submit-simulation="submitSimulation" />
  </AidesResultat>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";
  import FormulaireAideRetrofit from '@/components/custom/FormulaireAideRetrofit.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  
  const titrePage = "Mes aides - Retrofit";
  const simulationAidesRetrofitViewModel = ref<SimulationAideResultatViewModel | null>(null);

  const submitSimulation = (data: SimulationAideResultatViewModel) => {
    simulationAidesRetrofitViewModel.value = data;    
  };

  defineProps<{
    titre: string
  }>();
</script>

