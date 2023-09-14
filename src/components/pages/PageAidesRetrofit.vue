<template>
  <FilDAriane
    :page-courante="titrePage"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat :simulation-aides-view-model="simulationAidesRetrofitViewModel" :titre="titrePage">
    <template v-slot:formulaire>
      <FormulaireAideRetrofit @submit-simulation="submitSimulation" />     
    </template>
    <template v-slot:asideResultatAides>
      <AsideAideRetrofit @reset-simulation="resetSimulation" :code-postal="codePostal" :revenu-fiscal="revenuFiscal" />
    </template>
  </AidesResultat>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";
  import FormulaireAideRetrofit from '@/components/custom/FormulaireAideRetrofit.vue';
  import AsideAideRetrofit from '@/components/custom/AsideAideRetrofit.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  
  const titrePage = "Mes aides - Retrofit";
  const simulationAidesRetrofitViewModel = ref<SimulationAideResultatViewModel | null>(null);
  const codePostal = ref<string>('');
  const revenuFiscal = ref<string>('');

  const submitSimulation = (data: SimulationAideResultatViewModel, dataCodePostal: string, dataRevenuFiscal: string) => {
    codePostal.value = dataCodePostal;
    revenuFiscal.value = dataRevenuFiscal;
    simulationAidesRetrofitViewModel.value = data;
  };

  const resetSimulation = () => simulationAidesRetrofitViewModel.value = null;

  defineProps<{
    titre: string
  }>();
</script>

