<template>
  <SimulationWwIntroduction
    v-if="etapeActuelle === EtapeSimulateur.INTRODUCTION"
    :passer-etape-suivante="
      () => {
        etapeActuelle = EtapeSimulateur.RENSEIGNEMENT;
      }
    "
  />

  <SimulationWwRenseignement v-if="etapeActuelle === EtapeSimulateur.RENSEIGNEMENT" />

  <KyCsAction
    v-if="etapeActuelle === EtapeSimulateur.SIMULATEUR"
    :action-id="SimulateursSupportes.WINTER"
    :idEnchainementKycs="idEnchainementKycs"
    :type-action="TypeAction.SIMULATEUR"
    class="fr-px-2w"
  >
    <template v-slot:fin>
      <SimulationResultatVoiture />
    </template>
  </KyCsAction>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SimulationResultatVoiture from '@/components/custom/Action/Simulation/Voiture/SimulationResultatVoiture.vue';
  import SimulationWwIntroduction from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWIntroduction.vue';
  import SimulationWwRenseignement from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWRenseignement.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository.js';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes.js';

  defineProps<{
    idEnchainementKycs: string;
  }>();

  enum EtapeSimulateur {
    INTRODUCTION = 'introduction',
    RENSEIGNEMENT = 'question',
    SIMULATEUR = 'resultat',
  }

  const etapeActuelle = ref<EtapeSimulateur>(EtapeSimulateur.RENSEIGNEMENT);
</script>
