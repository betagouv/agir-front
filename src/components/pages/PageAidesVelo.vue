<template>
  <FilDAriane
    :page-courante="titrePage"
    :page-hierarchie="[{label: 'Aides fincancières', url: 'mes-aides'}]"
  />
  <AidesResultat :simulation-aides-view-model="simulationAidesVeloViewModel" :titre="titrePage">
    <template v-slot:formulaire>
      <FormulaireAideVelo @submit-simulation="submitSimulation" />
    </template>
    <template v-slot:asideResultatAides>
      <AsideAideVelo @reset-simulation="resetSimulation" :code-postal="codePostal" :revenu-fiscal="revenuFiscal"/>
    </template>
  </AidesResultat>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import AidesResultat from "@/components/custom/AidesResultat.vue";
  import FormulaireAideVelo from '@/components/custom/FormulaireAideVelo.vue';
  import AsideAideVelo from '@/components/custom/AsideAideVelo.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  
  const titrePage = "Acheter un vélo";
  const simulationAidesVeloViewModel = ref<SimulationAideResultatViewModel | null>(null);
  const codePostal = ref<string>('');
  const revenuFiscal = ref<string>('');

  const submitSimulation = (data: SimulationAideResultatViewModel, dataCodePostal: string, dataRevenuFiscal: string) => {
    codePostal.value = dataCodePostal;
    revenuFiscal.value = dataRevenuFiscal;    
    simulationAidesVeloViewModel.value = data;
  };

  const resetSimulation = () => simulationAidesVeloViewModel.value = null;

  defineProps<{
    titre: string
  }>();
</script>