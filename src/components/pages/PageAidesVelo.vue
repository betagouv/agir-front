<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="titrePage" :page-hierarchie="[{ label: 'Aides fincancières', url: 'vos-aides' }]" />
    <AidesResultat
      titre-categorie-aide="Acheter un vélo"
      :simulation-aides-view-model="simulationAidesVeloViewModel"
      :titre="titrePage"
      :sous-titre="sousTitre"
    >
      <template v-slot:formulaire>
        <FormulaireAideVelo @submit-simulation="submitSimulation" />
      </template>
      <template v-slot:asideResultatAides>
        <AsideAideVelo
          @submit-simulation="submitSimulation"
          :code-postal="codePostal"
          :revenu-fiscal="revenuFiscal"
          :nombre-de-parts-fiscales="nombreDePartsFiscales"
          :prix-du-velo="prixDuVelo"
        />
      </template>
    </AidesResultat>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import AidesResultat from '@/components/custom/Aides/AidesResultat.vue';
  import FormulaireAideVelo from '@/components/custom/Aides/AidesVeloFormulaire.vue';
  import AsideAideVelo from '@/components/custom/Aides/AidesVeloAside.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';

  const titrePage = 'Acheter un vélo';
  const sousTitre = 'Vous pouvez bénéficier des aides vélo suivantes :';
  const simulationAidesVeloViewModel = ref<SimulationAideResultatViewModel | null>(null);
  const codePostal = ref<number>(0);
  const revenuFiscal = ref<number>(0);
  const nombreDePartsFiscales = ref<number>(0);
  const prixDuVelo = ref<number>(1000);

  const submitSimulation = (
    data: SimulationAideResultatViewModel,
    dataCodePostal: number,
    dataRevenuFiscal: number,
    dataNombreDePartsFiscales: number,
    dataPrixDuVelo: number
  ) => {
    codePostal.value = dataCodePostal;
    revenuFiscal.value = dataRevenuFiscal;
    nombreDePartsFiscales.value = dataNombreDePartsFiscales;
    simulationAidesVeloViewModel.value = data;
    prixDuVelo.value = dataPrixDuVelo | 1000;
  };
</script>
