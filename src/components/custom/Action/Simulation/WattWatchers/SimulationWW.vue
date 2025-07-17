<template>
  <SimulationWwIntroduction
    v-if="etapeActuelle === EtapeSimulateur.INTRODUCTION"
    :passer-etape-suivante="
      () => {
        etapeActuelle = EtapeSimulateur.RENSEIGNEMENT;
      }
    "
  />

  <SimulationWwRenseignement
    v-if="etapeActuelle === EtapeSimulateur.RENSEIGNEMENT"
    :passer-etape-suivante="
      () => {
        etapeActuelle = EtapeSimulateur.SIMULATEUR;
      }
    "
  />

  <SimulationResultatWW
    v-if="aDeteEteSimuleRef && etapeActuelle === EtapeSimulateur.SIMULATEUR"
    :on-recommencer-clicked="onRecommencerClicked"
  />

  <KyCsAction
    v-else-if="etapeActuelle === EtapeSimulateur.SIMULATEUR"
    :action-id="SimulateursSupportes.WINTER"
    :idEnchainementKycs="idEnchainementKycs"
    :type-action="TypeAction.SIMULATEUR"
    class="fr-px-2w fr-mb-2w"
    @fin-kyc-atteinte="onFin"
  >
  </KyCsAction>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import SimulationResultatWW from '@/components/custom/Action/Simulation/WattWatchers/SimulationResultatWW.vue';
  import SimulationWwIntroduction from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWIntroduction.vue';
  import SimulationWwRenseignement from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWRenseignement.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository.js';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes.js';

  const props = defineProps<{
    idEnchainementKycs: string;
    aDejaEteSimule: boolean;
  }>();

  const aDeteEteSimuleRef = ref<boolean>(props.aDejaEteSimule);

  enum EtapeSimulateur {
    INTRODUCTION = 'introduction',
    RENSEIGNEMENT = 'question',
    SIMULATEUR = 'resultat',
  }

  const etapeActuelle = ref<EtapeSimulateur>();
  etapeActuelle.value = props.aDejaEteSimule ? EtapeSimulateur.SIMULATEUR : EtapeSimulateur.INTRODUCTION;

  const onRecommencerClicked = () => {
    aDeteEteSimuleRef.value = false;
    etapeActuelle.value = EtapeSimulateur.SIMULATEUR;
  };

  const onFin = () => {
    aDeteEteSimuleRef.value = true;
    etapeActuelle.value = EtapeSimulateur.SIMULATEUR;
  };
</script>
